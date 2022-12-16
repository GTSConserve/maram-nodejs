"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _po = require("../../controllers/super_admin/po/po.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var poRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
poRouter.get('/get_po_pending', _po.getPoPending);
poRouter.get('/single_po', _po.getSinglePoPending);
poRouter.post('/update_po', _po.updatePo);
poRouter.get('/get_po_approved', _po.getPoApproved);
poRouter.get('/get_single_po_approved', _po.getSinglePoApproved);
var _default = poRouter;
exports["default"] = _default;