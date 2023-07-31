import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import UserRouter from "./router/user.router";
import AirlineDetailsRouter from "./router/airlineDetails.router";
import AirportRouter from "./router/airportDetails.router";
import AirlineFlightRouter from "./router/airlineFlights.router";

import FlightRouter from "./router/flights.router";
import ReviewBookingRouter from "./router/reviewBooking.router";
var app = express();

const port = process.env.PORT || 8001;

app.use(express.json());

app.listen(port, () => {
  console.log("Your Port listening on :" + port);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/" + process.env.DB_NAME)
  .then(() => console.log("Connected"));

app.use("/users", UserRouter);
app.use("/airlineDetails", AirlineDetailsRouter);
app.use("/airport", AirportRouter);

app.use("/airFlights", AirlineFlightRouter);

app.use("/flights", FlightRouter);

app.use("/booking", ReviewBookingRouter);
