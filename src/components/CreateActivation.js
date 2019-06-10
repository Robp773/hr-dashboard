import React from "react";
import { API_BASE_URL, STATES_DB } from "../config";
import Select from "react-select";
import SelectEarthquake from "./SelectEarthquake";
import Spinner from "./Spinner";
import ReactTooltip from "react-tooltip";

export default class CreateActivation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorsList: [],
      loading: false,
      results: [],
      statesIncluded: [],
      activationName: this.props.defaultVals.activationName,
      disasterType: this.props.defaultVals.disasterType,
      level: this.props.defaultVals.level,
      states: this.props.defaultVals.states,
      updateInterval: this.props.defaultVals.updateInterval / 60000,
      analysisInterval: this.props.defaultVals.analysisInterval / 60000,
      streamEnabled: this.props.defaultVals.streamEnabled,
      streamParams: this.props.defaultVals.streamParams,
      searchParams: this.props.defaultVals.searchParams,
      earthquakeData: this.props.defaultVals.earthquakeData,
      earthquakeParams: this.props.defaultVals.earthquakeParams,
      mapLayers: this.props.defaultVals.mapLayers
    };

    this.setEarthquake = this.setEarthquake.bind(this);
    this.setEarthquakeRadius = this.setEarthquakeRadius.bind(this);
  }

  componentDidMount() {
    fetch(`${STATES_DB}/state-list`).then(res => {
      return res.json().then(result => {
        let optionsArray = [];
        for (let i = 0; i < result.length; i++) {
          optionsArray.push({
            value: result[i],
            label: result[i]
          });
        }
        this.setState({
          results: optionsArray
        });
      });
    });
  }

  checkFormValues() {
    let errorsList = [];
    if (this.state.activationName === "") {
      errorsList.push("Please choose an activation name");
    }
    if (this.state.statesIncluded.length < 1) {
      errorsList.push("Please pick at least one state for this activation");
    }
    if (this.state.disasterType === "") {
      errorsList.push("Please pick a disaster type");
    }
    if (this.state.level === "") {
      errorsList.push("Please choose an activation level");
    }
    if (errorsList.length > 0) {
      console.log(errorsList.length);
      this.setState({ errorsList });
      return false;
    } else {
      return true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.checkFormValues()) {
      console.log("CHECK FAILED");
      return;
    }

    this.setState({ loading: true, errorsList: [] });

    fetch(`${API_BASE_URL}/activate`, {
      method: this.props.reqType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        activationName: this.state.activationName,
        disasterType: this.state.disasterType,
        level: this.state.level,
        states: this.state.statesIncluded || this.props.defaultVals.stateNames,
        updateInterval: this.state.updateInterval * 60000,
        analysisInterval: this.state.analysisInterval * 60000,
        streamEnabled: this.state.streamEnabled,
        streamParams: this.state.streamParams,
        searchParams: this.state.searchParams,
        earthquakeParams: this.state.earthquakeParams,
        mapLayers: this.state.mapLayers
      })
    }).then(() => {
      this.props.checkActivations().then(() => {
        this.props.toggleForm();
      });
    });
  }

  handleSelectChange(e) {
    let statesIncluded = [];
    for (let i = 0; i < e.length; i++) {
      statesIncluded.push(e[i].value);
    }
    this.setState({
      statesIncluded: statesIncluded
    });
  }

  handleDelete() {
    fetch(`${API_BASE_URL}/activate`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        activationName: this.state.activationName
      })
    }).then(() => {
      this.props.checkActivations().then(() => {
        this.setState({ loading: false });
        this.props.toggleForm();
      });
    });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    let currentState = this.state.searchParams.searchTerms;

    if (this.searchInput.value !== "") {
      currentState.push(this.searchInput.value);
      let state = Object.assign({}, this.state.searchParams, {
        searchTerms: currentState
      });
      this.setState({
        searchParams: state
      });
      this.searchInput.value = "";
    }
  }

  handleStreamSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    let userVal = this.streamUserInput.value;
    let keywordVal = this.streamKeywordInput.value;

    let userList = this.state.streamParams.users;
    let keywordList = this.state.streamParams.searchTerms;

    if (keywordVal !== "") {
      keywordList.push(keywordVal);
    }

    if (userVal !== "") {
      userList.push(userVal);
    }

    this.setState({
      streamParams: {
        users: userList,
        searchTerms: keywordList
      }
    });
    this.streamUserInput.value = "";
    this.streamKeywordInput.value = "";
  }

  onKeyPress(e) {
    if (e.which === 13) {
      this.handleStreamSubmit(e);
    }
  }

  handleLayerDelete(e, index) {
    e.preventDefault();
    e.stopPropagation();
    let currentLayers = this.state.mapLayers;
    currentLayers.splice(index, 1);
    this.setState({ mapLayers: currentLayers });
  }

  handleItemDelete(e, stateLocation, index) {
    e.preventDefault();
    e.stopPropagation();
    let currentState;

    if (stateLocation === "stream-users") {
      currentState = this.state.streamParams.users;
      currentState.splice(index, 1);
      let state = Object.assign({}, this.state.streamParams, {
        users: currentState
      });
      this.setState({
        streamParams: state
      });
    } else if (stateLocation === "stream-searchTerms") {
      currentState = this.state.streamParams.searchTerms;
      currentState.splice(index, 1);
      let state = Object.assign({}, this.state.streamParams, {
        searchTerms: currentState
      });
      this.setState({
        streamParams: state
      });
    } else if (stateLocation === "search-params") {
      currentState = this.state.searchParams.searchTerms;
      currentState.splice(index, 1);
      let state = Object.assign({}, this.state.searchParams, {
        searchTerms: currentState
      });
      this.setState({
        searchParams: state
      });
    }
  }

  setEarthquake(id, title) {
    if (id) {
      this.setState({ earthquakeParams: { ...this.state.earthquakeParams, id: id, title: title } });
    }
    // when "change" btn is clicked
    else {
      this.setState({ earthquakeParams: { ...this.state.earthquakeParams, id: null, title: null } });
    }
  }

  setEarthquakeRadius(radius) {
    this.setState({ earthquakeParams: { ...this.state.earthquakeParams, radius: radius } });
  }

  handleLayerKeyPress(e) {
    if (e.which === 13) {
      e.preventDefault();
      let currentLayers = this.state.mapLayers;
      currentLayers.push({ type: this.tempLayerType, url: this.layerInput.value });
      this.setState({ mapLayers: currentLayers });
      this.layerInput.value = "";
    }
  }

  render() {
    let searchResults;
    if (this.state.streamEnabled) {
      let userList = [];
      let searchTermList = [];

      for (let i = 0; i < this.state.streamParams.users.length; i++) {
        userList.push(
          <button
            onClick={e => {
              this.handleItemDelete(e, "stream-users", i);
            }}
            className="createActivation__single-search-item"
          >
            {this.state.streamParams.users[i]}
          </button>
        );
      }

      for (let i = 0; i < this.state.streamParams.searchTerms.length; i++) {
        searchTermList.push(
          <button
            onClick={e => {
              this.handleItemDelete(e, "stream-searchTerms", i);
            }}
            className="createActivation__single-search-item"
          >
            {this.state.streamParams.searchTerms[i]}
          </button>
        );
      }

      searchResults = (
        <div>
          <div>
            <h2>User Ids</h2>
            <div className="createActivation__search-item-category">{userList}</div>
          </div>
          <div>
            <h2>Search Terms</h2>
            <div className="createActivation__search-item-category">{searchTermList}</div>
          </div>
        </div>
      );
    } else {
      let searchTermList = [];
      for (let i = 0; i < this.state.searchParams.searchTerms.length; i++) {
        searchTermList.push(
          <button
            onClick={e => {
              this.handleItemDelete(e, "search-params", i);
            }}
            className="createActivation__single-search-item"
          >
            {this.state.searchParams.searchTerms[i]}
          </button>
        );
      }
      searchResults = (
        <div>
          <div>
            <h2>Search Terms</h2>
            <div className="createActivation__search-item-category">{searchTermList}</div>
          </div>
        </div>
      );
    }
    let disasterTypes = [
      {
        value: "Flooding",
        label: "Flooding"
      },
      {
        value: "Earthquake",
        label: "Earthquake"
      },
      {
        value: "Hurricane",
        label: "Hurricane"
      },
      {
        value: "Winter Storm",
        label: "Winter Storm"
      },
      {
        value: "Drought",
        label: "Drought"
      },
      {
        value: "Extreme Heat",
        label: "Extreme Heat"
      },
      {
        value: "Tornado",
        label: "Tornado"
      },
      {
        value: "Hurricane",
        label: "Hurricane"
      },
      {
        value: "Wildfire",
        label: "Wildfire"
      }
    ];

    let searchParamsForm;

    if (this.state.streamEnabled) {
      searchParamsForm = (
        <form
          onSubmit={e => {
            this.handleStreamSubmit(e);
          }}
          className="createActivation__search-form createActivation__search-form--stream"
        >
          <input
            onKeyPress={e => {
              this.onKeyPress(e);
            }}
            type="submit"
            ref={node => (this.streamUserInput = node)}
            className="createActivation__input createActivation__input--search-form"
            type="text"
            placeholder="User Id"
          />
          <input
            onKeyPress={e => {
              this.onKeyPress(e);
            }}
            type="submit"
            ref={node => (this.streamKeywordInput = node)}
            className="createActivation__input createActivation__input--search-form"
            type="text"
            placeholder="Keywords, phrases, hashtags"
          />
        </form>
      );
    } else {
      searchParamsForm = (
        <form
          onSubmit={e => {
            this.handleSearchSubmit(e);
          }}
          className="createActivation__search-form createActivation__search-form--search"
        >
          <div className="createActivation__input-wrapper">
            <input
              ref={node => (this.searchInput = node)}
              className="createActivation__input createActivation__input--search-form"
              type="text"
              placeholder="Keywords, phrases, hashtags"
            />
          </div>
        </form>
      );
    }
    return (
      <div className="createActivation">
        <div
          className="modal-bg"
          onClick={e => {
            this.props.toggleForm();
          }}
        >
          <form
            onSubmit={e => {
              this.handleSubmit(e, this.props.reqType);
            }}
            onClick={e => {
              e.stopPropagation();
            }}
            className="createActivation__form"
          >
            <button
              onClick={e => {
                e.preventDefault();
                this.props.toggleForm();
              }}
              className="createActivation__exit-btn"
            >
              X
            </button>
            <ReactTooltip classNam="createActivation__label" multiline />

            <h2 className="createActivation__heading">{this.props.type} Activation</h2>

            <div className="createActivation__label-input-parent">
              <label data-tip="The name for this activation" className="createActivation__label">
                Activation Name:
              </label>

              <input
                defaultValue={this.state.activationName}
                onChange={e => {
                  this.setState({ activationName: e.currentTarget.value });
                }}
                className="createActivation__input"
                type="text"
              />
            </div>

            <div className="createActivation__label-input-parent">
              <label
                data-tip="The type of disaster that the activation is for"
                className="createActivation__label"
              >
                Disaster Type:{" "}
              </label>
              <Select
                defaultValue={
                  this.state.disasterType === ""
                    ? null
                    : { value: this.state.disasterType, label: this.props.defaultVals.disasterType }
                }
                onChange={e => {
                  this.setState({ disasterType: e.value });
                }}
                options={disasterTypes}
              />
            </div>

            {this.state.disasterType === "Earthquake" ? (
              <SelectEarthquake
                earthquakeParams={this.state.earthquakeParams}
                setEarthquake={this.setEarthquake}
                setEarthquakeRadius={this.setEarthquakeRadius}
              />
            ) : null}

            <div className="createActivation__label-input-parent">
              <label data-tip="Humanity Road activation level" className="createActivation__label">
                Activation Level:
              </label>
              <Select
                defaultValue={
                  this.state.level === "" ? null : { value: this.state.level, label: this.state.level }
                }
                onChange={e => {
                  this.setState({ level: e.value });
                }}
                options={[{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }]}
              />
            </div>

            <div className="createActivation__label-input-parent">
              <label
                data-tip="The state data you want to include with this activation. This affects the cities and alerts tabs, regional data section, twitter widget, and ArcGIS map."
                className="createActivation__label"
              >
                State Data:
              </label>
              <Select
                defaultValue={this.state.states}
                isMulti
                onChange={e => this.handleSelectChange(e)}
                options={this.state.results}
              />
            </div>

            <div className="createActivation__label-input-parent">
              <label
                data-tip="How often weather alerts, city weather data, and earthquake related data (if the disaster type is earthquake) is updated."
                className="createActivation__label"
              >
                Update Interval:{" "}
              </label>
              <input
                className="createActivation__input"
                onChange={e => {
                  this.setState({ updateInterval: e.currentTarget.value });
                }}
                type="range"
                defaultValue={this.state.updateInterval}
                min={10}
                max={180}
              />
              <div className="createActivation__interval-count">{this.state.updateInterval} mins</div>
            </div>

            <div className="createActivation__label-input-parent">
              <label
                data-tip="How often social media analysis is run on collected tweets. Currently only works if Data Retrieval is set to stream."
                className="createActivation__label"
              >
                Analysis Interval:{" "}
              </label>
              <input
                className="createActivation__input"
                onChange={e => {
                  this.setState({ analysisInterval: e.currentTarget.value });
                }}
                type="range"
                defaultValue={this.state.analysisInterval}
                min={10}
                max={180}
              />
              <div className="createActivation__interval-count">{this.state.analysisInterval} mins</div>
            </div>

            <div className="createActivation__label-input-parent">
              <label
                data-tip="ArcGIS layers that you want to add to ArcGIS section."
                className="createActivation__label"
              >
                Add Layers:{" "}
              </label>
              <div className="createActivation__layer-parent">
                <Select
                  placeholder="Layer Type"
                  onChange={e => {
                    this.tempLayerType = e.value;
                  }}
                  id="select"
                  options={[
                    { value: "FeatureLayer", label: "Feature Layer" },
                    { value: "MapImageLayer", label: "Map Image Layer" }
                    // {value: 'ImageryLayer', label: 'Imagery Layer'},
                  ]}
                />
                <input
                  ref={node => (this.layerInput = node)}
                  onKeyPress={e => {
                    this.handleLayerKeyPress(e);
                  }}
                  placeholder="Layer URL"
                  className="createActivation__input createActivation__input--layer"
                  type="text"
                />
              </div>
            </div>

            <div>
              {this.state.mapLayers.map((item, index) => {
                return (
                  <button
                    onClick={e => {
                      this.handleLayerDelete(e, index);
                    }}
                    className="createActivation__single-search-item"
                  >
                    {item.type} - {item.url}
                  </button>
                );
              })}
            </div>

            <div className="createActivation__label-input-parent">
              <label
                data-tip="Social media data collection method <br> Search: not yet implemented - a less powerful / not as thorough way to gather Twitter data. Can be used with multiple dashboards simultaneously. <br>
              Stream: high powered search method that brings in tweets in real time. Can only run one stream at a time."
                className="createActivation__label"
              >
                Data Retrieval:{" "}
              </label>
              <div className="createActivation__input">
                <span>Search</span>
                <label class="switch createActivation__switch">
                  <input
                    checked={this.state.streamEnabled ? true : false}
                    onChange={() => this.setState({ streamEnabled: !this.state.streamEnabled })}
                    type="checkbox"
                  />
                  <span class="slider round" />
                </label>
                <span>Stream</span>
              </div>
            </div>

            <div className="createActivation__label-input-parent">
              <label
                data-tip="Search terms for search/stream data collection. <br> Press enter after typing to add to list. Commas between words are equivalent to AND operator <br>
              Search: Up to 500 characters allowed. <br>
              Stream: Up to 400 keywords and 5,000 user ids. User ids are numerical."
                className="createActivation__label"
              >
                Data Parameters:{" "}
              </label>
              {searchParamsForm}
            </div>

            <div
              className={`createActivation__search-params-totals ${
                this.state.searchParams.searchTerms.length > 0 ||
                this.state.streamParams.searchTerms.length > 0 ||
                this.state.streamParams.users.length > 0
                  ? null
                  : "hidden"
              }`}
            >
              {searchResults}
            </div>
            <div className="createActivation__error-list">
              {this.state.errorsList.map((error, index) => {
                return <div key={index}>{error}</div>;
              })}
            </div>

            <button className="createActivation__submit-btn" type="submit">
              {this.state.loading ? <Spinner /> : "Submit"}
            </button>

            {this.props.type === "Edit" ? (
              <button
                className="createActivation__delete-btn"
                onClick={e => {
                  e.preventDefault();
                  this.handleDelete();
                }}
              >
                Delete
              </button>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}
