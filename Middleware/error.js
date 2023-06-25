const { validationResult } = require("express-validator");

module.exports = (request, response, next) =>{
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + ", ", "");
      throw error}
}
