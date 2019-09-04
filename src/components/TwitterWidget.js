import React from "react";

export default class twitterWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.twttr.widgets.load();
  }

  componentDidUpdate() {
    window.twttr.widgets.load();
  }

  render() {
    return (
      <div id="twitterWidgets-parent" key={this.props.twitterList}>
        <a
          id="twitterWidget"
          className="twitter-timeline"
          data-chrome="noscrollbar noheader transparent"
          href={`https://twitter.com/DAFNReady/lists/${this.props.twitterList}`}
        />
      </div>
    );
  }
}
