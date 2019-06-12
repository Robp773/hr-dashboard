// let API_BASE_URL;
// if (process.env.NODE_ENV === "production") {
//   API_BASE_URL = "https://ancient-refuge-55954.herokuapp.com";
// } else {
//   API_BASE_URL = "http://localhost:8080";
// }

module.exports = {
  PORT: process.env.PORT || 8080,
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:8080" ||
    "https://ancient-refuge-55954.herokuapp.com",

  STATES_DB:
    process.env.REACT_APP_STATES_DB ||
    "http://localhost:8008" ||
    "https://boiling-citadel-50408.herokuapp.com"
};
