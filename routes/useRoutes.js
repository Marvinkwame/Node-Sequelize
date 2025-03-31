import express from "express"
import { addWorker, allWorkers, deleteWorker, updateWorker } from "../controller/userController.js"

const router = express.Router()


router.get("/", allWorkers)
router.post('/add', addWorker)           

router.put("/emp/:empId", updateWorker)

router.delete("/emp/:empId", deleteWorker)
export default router