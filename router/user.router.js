import express from "express";
import {
  getAllUsers,
  getSingleUser,
  addUser,
  deleteUser,
  updateUser,
} from "../Controller/user.controller";

const router = express.Router();

router.get("/get-all-users", getAllUsers);
router.get("/get-user/:userId", getSingleUser);

router.post("/add-user", addUser);

router.delete("/delete-user/:userID", deleteUser);

router.put("/update-user/:userID", updateUser);

export default router;
