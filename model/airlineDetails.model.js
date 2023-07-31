import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AirlineDetailSchema = new Schema({
  flightLogo: {
    type: String,
    required: null,
  },
  flightName: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("AirlineDetails", AirlineDetailSchema);
