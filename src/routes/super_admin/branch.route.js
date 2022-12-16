import express  from 'express';
import { getBranchAdmin,createBranchAdmin,updateBranchStatus,updateBranch,updateChangePassword,getChangePassword } from "../../controllers/super_admin/branch/branch.controller"


const branchRouter = express.Router({
  caseSensitive: true,
  strict: true
})

branchRouter.get('/get_branch_admin',getBranchAdmin)
// authRouter.get('/get_change_password', getChangePassword)
branchRouter.post('/update_change_password', updateChangePassword)
branchRouter.post('/create_branch_admin',createBranchAdmin)
branchRouter.post('/update_branch',updateBranch)
branchRouter.post('/update_branch_status',updateBranchStatus)


export default branchRouter