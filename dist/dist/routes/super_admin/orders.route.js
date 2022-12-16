"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _approve = require("../../controllers/super_admin/orders/approve.controller");
var _pending = require("../../controllers/super_admin/orders/pending.controller");
var _cancel = require("../../controllers/super_admin/orders/cancel.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ordersRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
ordersRouter.get("/get_approve_list", _approve.getApproveList);
ordersRouter.get("/get_pending_list", _pending.getPendingList);
ordersRouter.get("/get_cancel_list", _cancel.getCancelList);
var _default = ordersRouter;
exports["default"] = _default;