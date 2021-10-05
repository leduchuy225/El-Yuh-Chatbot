require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
  GET_STARTED: "1",
  DATE_FORMAT: "DD/MM/YYYY",

  Menu: {
    NEWS: "NEWS",
  },
};
