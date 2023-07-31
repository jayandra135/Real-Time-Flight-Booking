import express from "express";
import {
  getBookings,
  addToBook,
  removeFromBooked,
  updatePasseneger,
} from "../Controller/reviewBooking.controller";
const router = express.Router();

router.get("/get-booking/:userID", getBookings);

router.post("/add-to-book", addToBook);

router.delete("/remove-booking/:bookID", removeFromBooked);

router.patch("/update-passenger/:bookID", updatePasseneger);

export default router;
