import FlightModel from "../model/flights.model";
import date from "date-and-time";
const now = new Date();
const pattern = date.compile("ddd, MMM DD YYYY");

console.log(date.format(now, pattern));

export const getAllFLights = async (req, res) => {
  try {
    const flightData = await FlightModel.aggregate([
      {
        $lookup: {
          from: "airlinedetails",
          localField: "airlineID",
          foreignField: "_id",
          as: "airlinedetails",
        },
      },
      { $unwind: "$airlinedetails" },
      {
        $lookup: {
          from: "airlineflights",
          localField: "airlineFlightID",
          foreignField: "_id",
          as: "airlineflights",
        },
      },
      { $unwind: "$airlineflights" },
    ]);
    if (flightData) {
      return res.status(200).json({
        data: flightData,
        message: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addFlights = (req, res) => {
  try {
    const {
      airlineID,
      airlineFlightID,
      from,
      to,
      price,
      adult,
      child,
      travelClass,
      trip,
      depatureDate,
      returnDate,
    } = req.body;

    const createdRecord = new FlightModel({
      airlineID: airlineID,
      airlineFlightID: airlineFlightID,
      from: from,
      to: to,
      price: price,
      adult: adult,
      child: child,
      travelClass: travelClass,
      trip: trip,
      depatureDate: depatureDate,
      returnDate: returnDate,
    });
    createdRecord.save();
    if (createdRecord) {
      return res.status(200).json({
        data: createdRecord,
        message: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    const flightID = req.params.flightID;

    const flightData = await FlightModel.deleteOne({ _id: flightID });

    if (flightData) {
      return res.status(200).json({
        message: "deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const {
      airlineID,
      airlineFlightID,
      from,
      to,
      price,
      adult,
      child,
      travelClass,
      trip,
      depatureDate,
      returnDate,
    } = req.body;

    const flightID = req.params.flightID;

    const updateFlight = await FlightModel.updateOne(
      { _id: flightID },
      {
        $set: {
          airlineID: airlineID,
          airlineFlightID: airlineFlightID,
          from: from,
          to: to,
          price: price,
          adult: adult,
          child: child,
          travelClass: travelClass,
          trip: trip,
          depatureDate: depatureDate,
          returnDate: returnDate,
        },
      }
    );
    if (updateFlight.acknowledged) {
      return res.status(200).json({
        message: "Updated",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const addDate = async (req, res) => {
  try {
    const { depatureDate, returnDate } = req.query;

    //const flightData = await FlightModel.find();

    const updateDate = await FlightModel.updateMany(
      {},
      {
        $set: {
          depatureDate: depatureDate,
          returnDate: returnDate,
        },
      }
    );
    if (updateDate.acknowledged) {
      return res.status(200).json({
        message: "updated",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
