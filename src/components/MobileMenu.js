import React from "react";

export default function MobileMenu(props) {
  return (
    <div className="mobileMenu">
      <button
        onClick={() => props.changeMobileTab("Social")}
        className={`mobileMenu__btn ${
          props.activeTab === "Social" ? "mobileMenu__btn--active" : null
        }`}
      >
        Social
      </button>
      <button
        onClick={() => props.changeMobileTab("Event")}
        className={`mobileMenu__btn  mobileMenu__btn--middle ${
          props.activeTab === "Event" ? "mobileMenu__btn--active" : null
        }`}
      >
        Event
      </button>
      <button
        onClick={() => props.changeMobileTab("State")}
        className={`mobileMenu__btn ${
          props.activeTab === "State" ? "mobileMenu__btn--active" : null
        }`}
      >
        State
      </button>
    </div>
  );
}
