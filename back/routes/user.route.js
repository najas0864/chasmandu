import express from "express";
import { getUsers, createUsers, deleteUsers, loginUser, forgetPassword, updateUserPassword, } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/',getUsers);
router.post("/",createUsers);
router.post("/login",loginUser);
router.post("/logout",loginUser);
router.delete("/:id",deleteUsers);
router.post("/forget_password",forgetPassword);
router.put("/update-password",updateUserPassword);

export default router;