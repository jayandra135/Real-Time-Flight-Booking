import mongoose from "mongoose";
import airlineDetailsModel from "./airlineDetails.model";
const Schema = mongoose.Schema;

const AirlineFlightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true,
  },
  airlineDetails: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: airlineDetailsModel,
  },

  depatureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("AirlineFlights", AirlineFlightSchema);
