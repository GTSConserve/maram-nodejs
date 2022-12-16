"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _purchase_orders = require("../../controllers/branch_admin/purchaseOrder/purchase_orders.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var purchaseOrderRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
purchaseOrderRouter.get('/get_approve_purchase_list', _purchase_orders.getApprovePurchaseList);
purchaseOrderRouter.get('/get_generate_purchase_list', _purchase_orders.getGeneratePurchaseList);
purchaseOrderRouter.get('/get_cancel_purchase_list', _purchase_orders.getCancelPurchaseList);
var _default = purchaseOrderRouter;
exports["default"] = _default;