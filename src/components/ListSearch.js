import React from "react";
import { API_BASE_URL } from "../config";

export default class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "humanityRoad",
      searchOpen: false,
      searchLoaded: false,
      lists: null,
      searchResults: [],
      twitterList: props.twitterList
    };
    this.handleOpenSearch = this.handleOpenSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onCheck() {
    let account =
      this.state.account === "humanityRoad" ? "dafnReady" : "humanityRoad";
    this.textInput.value = "";
    this.setState({
      account,
      searchResults: this.state.lists[account]
    });
  }

  handleInputChange(e) {
    this.setState({ twitterList: e.currentTarget.value });
    let result = this.state.lists[this.state.account].filter(list => {
      return list.name
        .toUpperCase()
        .includes(this.textInput.value.toUpperCase());
    });
    this.setState({ searchResults: result });
  }

  handleOpenSearch(e) {
    e.preventDefault();
    this.setState({ searchOpen: true });
    fetch(`${API_BASE_URL}/lists`).then(res => {
      this.textInput.value = "";
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
    this.props.setTwitterList(URI);
    this.setState({ searchOpen: false, twitterList: URI });
  }

  render() {
    return (
      <div className="listSearch">
        <div className="createActivation__label-input-parent">
          <label
            data-tip="Which Twitter list you want to display. <br>
               Paste a URI (/HumanityRoad/lists/new-york) or use the search tool."
            className="createActivation__label"
          >
            Twitter List:
          </label>
          <input
            ref={input => {
              this.textInput = input;
            }}
            onFocus={this.handleOpenSearch}
            placeholder="Start typing to search"
            value={this.state.twitterList}
            onChange={this.handleInputChange}
            className="createActivation__input listSearch__input"
            type="text"
          />
        </div>

        {this.state.searchOpen ? (
          <div>
            {this.state.searchLoaded ? (
              <div className="listSearch__list-parent">
                <h3 className="listSearch__h3">
                  Choose an Account to Search From
                </h3>
                <div className="social-feed__feed-toggle">
                  <div className="social-feed__label">Humanity Road</div>
                  <label className="switch">
                    <input onChange={() => this.onCheck()} type="checkbox" />
                    <span className="slider round" />
                  </label>
                  <div className="social-feed__label">DAFNReady</div>
                </div>
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
                          <a href={`https://twitter.com/${list.uri}`}>
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
              "Loading..."
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
