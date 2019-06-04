module.exports = {
  PORT: process.env.PORT || 8080,
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://ancient-refuge-55954.herokuapp.com" ||
    "http://localhost:8080",
  STATES_DB:
    process.env.REACT_APP_STATES_DB ||
    "https://boiling-citadel-50408.herokuapp.com" ||
    "http://localhost:8008"
};
