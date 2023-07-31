import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  flightsID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  travelClass: {
    type: String,
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
  grandTotal: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Booking", BookingSchema);
