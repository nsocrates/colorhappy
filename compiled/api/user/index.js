'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('./user.controller');

var controller = _interopRequireWildcard(_user);

var _auth = require('../../auth/auth.service');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/me', (0, _auth.isAuthenticated)(), controller.me);
router.put('/me', (0, _auth.isAuthenticated)(), controller.update);
router.put('/me/password', (0, _auth.isAuthenticated)(), controller.updatePassword);
router.get('/:id', controller.show);
router.get('/:id/palettes', controller.showPalettes);
router.get('/:id/favorites', controller.showFavorites);

exports.default = router;