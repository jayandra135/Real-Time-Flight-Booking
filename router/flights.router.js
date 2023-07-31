import express from "express";

import {
  getAllFLights,
  addFlights,
  deleteFlight,
  updateFlight,
  addDate,
} from "../Controller/flights.controller";

const router = express.Router();

router.get("/get-all-flights", getAllFLights);

router.post("/add-flight", addFlights);

router.delete("/delete-flight/:flightID", deleteFlight);

router.put("/update-flight/:flightID", updateFlight);

router.patch("/add-date", addDate);

export default router;
