"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var handleValidationError = exports.handleValidationError = function handleValidationError(res) {
  var statusCode = arguments.length <= 1 || arguments[1] === undefined ? 422 : arguments[1];
  return function (err) {
    console.log(err);
    res.status(statusCode).json(err.message || err);
  };
};

var handleError = exports.handleError = function handleError(res) {
  var statusCode = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];
  return function (err) {
    console.log(err);
    res.status(statusCode).send(err.message || err);
  };
};

var handleNotFound = exports.handleNotFound = function handleNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
};

var respondWithResult = exports.respondWithResult = function respondWithResult(res) {
  var statusCode = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  return function (entity) {
    if (entity) res.status(statusCode).json(entity);
  };
};