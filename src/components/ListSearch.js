import React from "react";
import { API_BASE_URL } from "../config";
import Spinner from "./Spinner";

export default class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "humanityRoad",
      searchOpen: false,
      searchLoaded: false,
      lists: null,
      searchResults: [],
      searchTerm: "",
      twitterList: props.twitterList,
      selectedURI: null,
      modalOpen: false
    };
    this.handleOpenSearch = this.handleOpenSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onCheck() {
    let account =
      this.state.account === "humanityRoad" ? "dafnReady" : "humanityRoad";
    this.setState({
      searchTerm: "",
      account,
      searchResults: this.state.lists[account]
    });
  }

  handleInputChange(e) {
    this.setState({ searchTerm: e.currentTarget.value });
    let result = this.state.lists[this.state.account].filter(list => {
      return list.name
        .toUpperCase()
        .includes(e.currentTarget.value.toUpperCase());
    });
    this.setState({ searchResults: result });
  }

  handleOpenSearch(e) {
    e.preventDefault();

    if (this.state.searchOpen) {
      this.setState({ searchOpen: false });
      return;
    }

    this.setState({ searchOpen: true });
    fetch(`${API_BASE_URL}/lists`).then(res => {
      return res.json().then(result => {
        this.setState({
          searchLoaded: true,
          lists: result,
          searchResults: result[this.state.account]
        });
      });
    });
  }

  handleListSelection(URI) {
    this.setState({ modalOpen: true, selectedURI: URI });
    // this.setState({ searchOpen: false, twitterList: URI });
  }

  handleStateListMatch(state) {
    let copy = this.state.twitterList;
    copy[state] = { state, list: this.state.selectedURI };
    this.props.setTwitterList(copy);

    console.log(copy);
    this.setState({ modalOpen: false, searchTerm: "" });
  }

  render() {
    let modal = (
      <div className="listModal">
        <button
          onClick={() => this.setState({ modalOpen: false })}
          className="listModal__exitBtn"
        >
          X
        </button>
        <div className="listModal__form">
          <h3>Choose a State for this List</h3>
          <div className="listModal__selectedURI">
            Selected: {this.state.selectedURI}
          </div>
          <div className="">
            <h4>States in this Activation</h4>
            {this.props.states.map((state, key) => {
              return (
                <div
                  onClick={() => {
                    this.handleStateListMatch(
                      state.label ? state.label : state
                    );
                  }}
                  className="listModal__state"
                  key={key}
                >
                  {state.label ? state.label : state}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
    return (
      <div className="listSearch">
        <div className="createActivation__label-input-parent">
          <label
            data-tip="Which Twitter list you want to display. <br>
             Use the search tool to choose from existing lists."
            className="createActivation__label"
          >
            Twitter List(s):
          </label>

          <div className="listSearch__search-wrapper">
            <div>
              {this.props.states.length > 0
                ? this.props.states.map((state, key) => {
                    let checkedKey = state.label ? state.label : state;
                    return (
                      <div key={key}>
                        <b>{state.label ? state.label : state}</b>:{" "}
                        {this.state.twitterList[checkedKey]
                          ? this.state.twitterList[checkedKey].list
                          : "None Selected"}
                      </div>
                    );
                  })
                : "Please select a state before choosing a Twitter list"}
            </div>
            <button
              className="listSearch__openBtn"
              onClick={this.handleOpenSearch}
            >
              {this.state.searchOpen ? "Close" : "Open"} Search
            </button>
          </div>
        </div>

        {this.state.searchOpen ? (
          <div>
            {this.state.searchLoaded ? (
              <div className="listSearch__list-parent">
                <h3 className="listSearch__h3">Select lists for each state</h3>
                <div className="social-feed__feed-toggle">
                  <div className="social-feed__label">Humanity Road</div>
                  <label className="switch">
                    <input onChange={() => this.onCheck()} type="checkbox" />
                    <span className="slider round" />
                  </label>
                  <div className="social-feed__label">DAFNReady</div>
                </div>

                <input
                  placeholder="Start typing to search"
                  value={this.state.searchTerm}
                  onChange={this.handleInputChange}
                  className="createActivation__input listSearch__input"
                  type="text"
                />
                {this.state.modalOpen ? modal : null}

                <div className="listSearch__results-parent">
                  {this.state.searchResults.map((list, index) => {
                    return (
                      <div
                        onClick={() => {
                          this.handleListSelection(list.uri);
                        }}
                        className="listSearch__single-list"
                        key={index}
                      >
                        <div className="">
                          <a target="#" href={`https://twitter.com/${list.uri}`}>
                            {list.name}
                          </a>
                        </div>
                        <div>{list.uri}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Spinner color="rgb(243, 142, 32)"/>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
