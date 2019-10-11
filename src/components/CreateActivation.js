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
      statesIncluded: this.props.defaultVals.states,
      activationName: this.props.defaultVals.activationName,
      disasterType: this.props.defaultVals.disasterType,
      level: this.props.defaultVals.level,
      states: this.props.defaultVals.states,
      searchParams: this.props.defaultVals.searchParams,
      earthquakeData: this.props.defaultVals.earthquakeData,
      mapLayers: this.props.defaultVals.mapLayers,
      entitiesTracking: this.props.defaultVals.entitiesTracking
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
        searchParams: this.state.searchParams,
        earthquakeData: this.state.earthquakeData,
        mapLayers: this.state.mapLayers,
        entitiesTracking: this.state.entitiesTracking
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
    let currentState = this.state.searchParams;

    if (this.searchInput.value !== "") {
      currentState.push(this.searchInput.value.toLowerCase());
      this.setState({
        searchParams: currentState
      });
      this.searchInput.value = "";
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

    if (stateLocation === "search-params") {
      currentState = this.state.searchParams;
      currentState.splice(index, 1);
      this.setState({
        searchParams: currentState
      });
    }
  }

  setEarthquake(id, title) {
    if (id) {
      this.setState({
        earthquakeData: {
          ...this.state.earthquakeData,
          params: { ...this.state.earthquakeData.params, id, title }
        }
      });
    }
    // when "change" btn is clicked
    else {
      this.setState({
        earthquakeData: {
          ...this.state.earthquakeData,
          params: { id: null, title: null, radius: 150 }
        }
      });
    }
  }

  setEarthquakeRadius(radius) {
    this.setState({
      earthquakeData: {
        ...this.state.earthquakeData,
        params: { ...this.state.earthquakeData.params, radius: Number(radius) }
      }
    });
  }

  handleLayerKeyPress(e) {
    if (e.which === 13) {
      e.preventDefault();
      let currentLayers = this.state.mapLayers;
      currentLayers.push({
        type: this.tempLayerType,
        url: this.layerInput.value
      });
      this.setState({ mapLayers: currentLayers });
      this.layerInput.value = "";
    }
  }

  render() {
    let searchTermList = [];
    for (let i = 0; i < this.state.searchParams.length; i++) {
      searchTermList.push(
        <button
          onClick={e => {
            this.handleItemDelete(e, "search-params", i);
          }}
          className="createActivation__single-search-item"
        >
          {this.state.searchParams[i]}
        </button>
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

            <h2 className="createActivation__heading">
              {this.props.type} Activation
            </h2>

            <div className="createActivation__label-input-parent">
              <label
                data-tip="The name for this activation"
                className="createActivation__label"
              >
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
                    : {
                        value: this.state.disasterType,
                        label: this.props.defaultVals.disasterType
                      }
                }
                onChange={e => {
                  this.setState({ disasterType: e.value });
                }}
                options={disasterTypes}
              />
            </div>

            {this.state.disasterType === "Earthquake" ? (
              <SelectEarthquake
                earthquakeParams={this.state.earthquakeData.params}
                setEarthquake={this.setEarthquake}
                setEarthquakeRadius={this.setEarthquakeRadius}
              />
            ) : null}

            <div className="createActivation__label-input-parent">
              <label
                data-tip="Humanity Road activation level"
                className="createActivation__label"
              >
                Activation Level:
              </label>
              <Select
                defaultValue={
                  this.state.level === ""
                    ? null
                    : { value: this.state.level, label: this.state.level }
                }
                onChange={e => {
                  this.setState({ level: e.value });
                }}
                options={[
                  { value: 1, label: 1 },
                  { value: 2, label: 2 },
                  { value: 3, label: 3 }
                ]}
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
                data-tip="Search terms for data collection. <br> Press enter after typing to add to list. Commas between words are equivalent to AND operator. <br>
               Up to 500 characters allowed."
                className="createActivation__label"
              >
                Twitter Search Parameters:
              </label>
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
              </form>{" "}
            </div>

            <div
              className={`createActivation__search-params-totals ${
                this.state.searchParams.length > 0 ? null : "hidden"
              }`}
            >
              <div>
                <div>
                  <h2>Search Terms</h2>
                  <div className="createActivation__search-item-category">
                    {searchTermList}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="createActivation__label-input-parent">
              <label
                data-tip="Should data analysis be turned on for this activation. Limited to one dashboard at a time."
                className="createActivation__label"
              >
                Data Analysis:
              </label>
              <div className="social-feed__feed-toggle">
                <div className="social-feed__label">Off</div>
                <label className="switch">
                  {this.state.entitiesTracking ? (
                    <input
                    checked
                      onChange={() =>
                        this.setState({
                          entitiesTracking: !this.state.entitiesTracking
                        })
                      }
                      type="checkbox"
                    />
                  ) : (
                    <input
                      onChange={() =>
                        this.setState({
                          entitiesTracking: !this.state.entitiesTracking
                        })
                      }
                      type="checkbox"
                    />
                  )}

                  <span className="slider round" />
                </label>
                <div className="social-feed__label">On</div>
              </div>
            </div> */}
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
