import express  from 'express';
import { getBranchAdmin,createBranchAdmin,updateBranchStatus,updateBranch,updateChangePassword,getChangePassword ,createGenerateBill,getPendingBill,getReceivedBill,getCompletedBill,approveBill} from "../../controllers/super_admin/branch/branch.controller"


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




// bills 
branchRouter.post('/generate_bill',createGenerateBill)

branchRouter.get('/get_pending_bill',getPendingBill)
branchRouter.get('/get_received_bill',getReceivedBill)
branchRouter.get('/get_completed_bill',getCompletedBill)

branchRouter.post('/approve_bill',approveBill)


export default branchRouter