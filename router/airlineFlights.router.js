import {
  getAllAirlineFlight,
  getAirlineFlight,
  addAirFlight,
  deleteAirFlight,
  updateAirFlight,
} from "../Controller/airlineFlight.controller";
import express from "express";

const router = express.Router();

router.get("/get-all-airFlights", getAllAirlineFlight);
router.get("/get-airFlight/:flightID", getAirlineFlight);

router.post("/add-airFlight", addAirFlight);

router.delete("/delete-airFlight/:flightID", deleteAirFlight);

router.put("/update-airflight/:flightID", updateAirFlight);

export default router;
