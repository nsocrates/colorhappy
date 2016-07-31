'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = undefined;
exports.validateUserSignup = validateUserSignup;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper function to create our Promises.
var validate = exports.validate = function validate(field) {
  return function (_ref) {
    var method = _ref.method;
    var message = _ref.message;
    var _ref$options = _ref.options;
    var options = _ref$options === undefined ? {} : _ref$options;
    return new Promise(function (resolve, reject) {
      var isOkay = _validator2.default[method](field, options);
      return isOkay ? resolve(field) : reject({ field: field, message: message });
    });
  };
};

// Validates user input on signup.
function validateUserSignup(_ref2) {
  var email = _ref2.email;
  var username = _ref2.username;
  var password = _ref2.password;

  var validateEmail = validate(email);
  var validateUsername = validate(username);
  var validatePassword = validate(password);

  return Promise.all([validateEmail({
    method: 'isEmail',
    message: "Doesn't look like a valid email..."
  }), validateUsername({
    method: 'isLength',
    options: { min: 3 },
    message: 'Username must be at least 3 characters long'
  }), validateUsername({
    method: 'isAlphanumeric',
    options: 'en-US',
    message: 'Username must not contain special characters'
  }), validatePassword({
    method: 'isLength',
    options: { min: 3 },
    message: 'Password must be at least 3 characters long'
  })]).then(function () {
    return Promise.resolve({ email: email, username: username, password: password });
  }).catch(function (error) {
    return Promise.reject(error);
  });
}