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
branchRouter.post('/create_branch_admin', _branch.createBranchAdmin);
branchRouter.post('/update_branch', _branch.updateBranch);
branchRouter.post('/update_branch_status', _branch.updateBranchStatus);
var _default = branchRouter;
exports["default"] = _default;