"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _branch = require("../../controllers/super_admin/branch/branch.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var branchRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});
branchRouter.get('/get_branch_admin', _branch.getBranchAdmin);
// authRouter.get('/get_change_password', getChangePassword)
branchRouter.post('/update_change_password', _branch.updateChangePassword);
branchRouter.post('/create_branch_admin', _branch.createBranchAdmin);
branchRouter.post('/update_branch', _branch.updateBranch);
branchRouter.post('/update_branch_status', _branch.updateBranchStatus);

// bills 
branchRouter.post('/generate_bill', _branch.createGenerateBill);
branchRouter.get('/get_pending_bill', _branch.getPendingBill);
branchRouter.get('/get_received_bill', _branch.getReceivedBill);
branchRouter.get('/get_completed_bill', _branch.getCompletedBill);
branchRouter.post('/approve_bill', _branch.approveBill);

// get zone based on city for front end

branchRouter.post('/get_zones', _branch.getZones);
var _default = branchRouter;
exports["default"] = _default;