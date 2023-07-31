import mongoose from "mongoose";

import AirlineDetailsModel from "./airlineDetails.model";
import AirportModel from "./AirportDetails.model";
import AirlineFlightsModel from "./airlineFlights.model";

const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  airlineID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: AirlineDetailsModel,
  },

  airlineFlightID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: AirlineFlightsModel,
  },
  from: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: AirportModel,
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: AirportModel,
  },
  price: {
    type: Number,
    required: true,
  },

  adult: {
    type: Number,
    required: true,
  },
  child: {
    type: Number,
    required: true,
  },
  travelClass: {
    type: String,
    required: true,
  },
  trip: {
    type: String,
    required: true,
  },
  depatureDate: {
    type: String,
    required: false,
  },
  returnDate: {
    type: String,
    required: false,
  },
  grandTotal: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Flights", FlightSchema);
