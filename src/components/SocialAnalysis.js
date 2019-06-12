import React from "react";
// import EntitiesAnalysis from "./EntitiesAnalysis";
import Trends from "./Trends";

export default class SocialAnalysis extends React.Component {
  //   shouldComponentUpdate(nextProps) {
  //     if (this.props.socialAnalysis.entities.snapShotTime !== nextProps.socialAnalysis.entities.snapShotTime) {
  //       return true;
  //     } else if (this.props.socialAnalysis.trends.hashtags !== nextProps.socialAnalysis.trends.hashtags) {
  //       return true;
  //     } else if (this.props.analysisView !== nextProps.analysisView) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  render() {
    // let analysisView;
    // if(this.props.analysisView === 'entities'){
    //     analysisView = <EntitiesAnalysis entities={this.props.socialAnalysis.entities}/>
    // }

    // else if(this.props.analysisView === 'trends'){
    //     analysisView = <Trends trends={this.props.socialAnalysis.trends}/>
    // }

    return (
      <div className="socialAnalysis">
        <Trends trends={this.props.socialAnalysis.trends} />
        {/* {analysisView} */}
      </div>
    );
  }
}
