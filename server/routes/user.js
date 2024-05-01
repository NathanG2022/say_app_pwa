import express from "express";
const router = express.Router();

import { signin, signup, verify, getUsers, getVerify } from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get('/getUsers', auth, getUsers);
router.patch('/verify', verify); //export const verify = (id) => API.patch(`/user/verify/${id}`)
router.get('/getVerify/:id', getVerify); //export const getVerify = (id) => API.get(`/user/getVerify/${id}`);
export default router;