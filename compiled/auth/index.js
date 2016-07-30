'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _local = require('./local');

var _local2 = _interopRequireDefault(_local);

var _passport = require('./local/passport');

var _passport2 = _interopRequireDefault(_passport);

var _sqldb = require('../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _sqldb.db.User;


(0, _passport2.default)(User);

var router = new _express.Router();

router.use('/local', _local2.default);

exports.default = router;