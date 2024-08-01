const CustomError = require("../utils/customError");
const Response = require("../utils/Response");

exports.home = (req, res) => {
  res.send("Welcome to the home page");
};

exports.demo = (req, res, next) => {
  try {
    const isError = true;
    if (isError) {
      throw new CustomError("This is a custom error message", 400);
    }

    // Normal response if no error
    Response(res, 200, { key: "value" }, "Data retrieved successfully");
  } catch (error) {
    next(error);
  }
};
