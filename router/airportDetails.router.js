import express from "express";
import {
  getAllAirports,
  getSingleAirport,
  addAirport,
  updateAirport,
  deleteAirport,
} from "../Controller/airportDetails.controller";
const router = express.Router();

router.get("/get-all-airports", getAllAirports);

router.get("/get-airport/:airportID", getSingleAirport);

router.post("/add-airport", addAirport);

router.put("/update-airport/:airportID", updateAirport);

router.delete("/delete-airport/:airportID", deleteAirport);
export default router;
