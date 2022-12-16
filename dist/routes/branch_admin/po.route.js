"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _po = require("../../controllers/branch_admin/po/po.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var poRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
poRouter.get('/get_po_form', _po.getPoForm);
poRouter.post('/create_po', _po.createPoForm);
poRouter.get('/get_po_pending', _po.getPoFormPending);
poRouter.get('/get_po_approved', _po.getApprovePO);
poRouter.get('/get_po_single_approved', _po.getSingleApprovePO);
var _default = poRouter;
exports["default"] = _default;