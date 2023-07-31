import {
  getAllAirlines,
  getSingleAirline,
  addAirline,
  updateAirline,
  deleteAirline,
} from "../Controller/airlineDetails.controller";
import express from "express";

const router = express.Router();

router.get("/get-all-airlines", getAllAirlines);

router.get("/get-single-airline/:flightID", getSingleAirline);

router.post("/add-airline", addAirline);

router.delete("/delete-airline/:flightID", deleteAirline);

router.put("/update-airline/:flightID", updateAirline);

export default router;
