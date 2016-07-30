'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _palette = require('./palette.controller');

var controller = _interopRequireWildcard(_palette);

var _auth = require('../../auth/auth.service');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

router.get('/', controller.index);
router.post('/', (0, _auth.isAuthenticated)(), controller.create);
router.get('/:id', controller.show);
router.put('/:id', (0, _auth.isAuthenticated)(), controller.update);
router.delete('/:id', (0, _auth.isAuthenticated)(), controller.destroy);
router.post('/:id/favorite', (0, _auth.isAuthenticated)(), controller.favorite);
router.delete('/:id/favorite', (0, _auth.isAuthenticated)(), controller.unfavorite);
router.get('/download/:hex', controller.download);

exports.default = router;