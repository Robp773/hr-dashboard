import React from "react";

export default function Status(props) {
  let statusColor;
  if (props.status === 1) {
    statusColor = { background: "green", color: "white" };
  } else if (props.status === 2) {
    statusColor = { background: "yellow" };
  } else if (props.status === 3) {
    statusColor = { background: "red", color: "white" };
  }

  return (
    <div className="status">
      <div className="status__alert" style={statusColor}>
        {props.status}
      </div>
    </div>
  );
}
