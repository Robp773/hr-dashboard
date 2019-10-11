import React from "react";
export default function Locations(props) {
  let listData = [];
  for (let i = 0; i < props.locations.length; i++) {
    listData.push(
      <tr className={`${i % 2 === 0 ? "td-even" : ""}`} key={i}>
        <td className="standard__td">{props.locations[i].name}</td>
        <td className="standard__td">{props.locations[i].count}</td>
      </tr>
    );
  }
  return (
    <div className="standard__data-parent">
      <table className="standard__table">
        <tbody>
          <tr className="standard-row">
            <th className="standard__th hashtags__th--name">Location</th>
            <th className="standard__th">Count</th>
          </tr>
          {listData}
        </tbody>
      </table>{" "}
    </div>
  );
}
