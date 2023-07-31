import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AirportSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  airportName: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  terminal: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Airport", AirportSchema);
