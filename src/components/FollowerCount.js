import React from "react";

export default function FollowerCount(props) {
  let listData = [];
  for (let i = 0; i < props.followerCount.length; i++) {
    listData.push(
      <tr className={`standard__tr ${i % 2 === 0 ? "td-even" : ""}`} key={i}>
        <td className="standard__td">{i + 1}</td>
        <td className="standard__td">
          <a
            target="#"
            href={`https://www.twitter.com/${props.followerCount[i].screen_name}`}
          >
            {props.followerCount[i].screen_name}
          </a>
        </td>
        <td className="standard__td">
          {props.followerCount[i].followers.toLocaleString()}
        </td>
      </tr>
    );
  }

  return (
    <div className="followerCount">
      <table className="standard__table">
        <tbody>
          <tr className="standard__top-row">
            <th className="standard__th">Rank</th>
            <th className="standard__th">User Name</th>
            <th className="standard__th">Followers</th>
          </tr>
          {listData}
        </tbody>
      </table>
    </div>
  );
}
