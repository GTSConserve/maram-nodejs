"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bill = require("../../controllers/branch_admin/bill/bill.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var billRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
billRouter.get('/get_pending_bill', _bill.getPendingBill);
billRouter.get('/get_payed_bill', _bill.getPayedBill);
billRouter.get('/get_completed_bill', _bill.getCompletedBill);
billRouter.post('/pay_bill', _bill.payBill);
var _default = billRouter;
exports["default"] = _default;