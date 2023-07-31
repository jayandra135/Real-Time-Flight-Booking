import AirlineFlightsModel from "../model/airlineFlights.model";

export const getAllAirlineFlight = async (req, res) => {
  try {
    const airFlightData = await AirlineFlightsModel.aggregate([
      {
        $lookup: {
          from: "airlinedetails",
          localField: "airlineDetails",
          foreignField: "_id",
          as: "airlinedetails",
        },
      },
      { $unwind: "$airlinedetails" },
    ]);

    //console.log(airFlightData);
    if (airFlightData) {
      return res.status(200).json({
        data: airFlightData,
        message: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAirlineFlight = async (req, res) => {
  try {
    const flightID = req.params.flightID;

    const airFlightData = await AirlineFlightsModel.findOne({ _id: flightID });
    if (airFlightData) {
      return res.status(200).json({
        data: airFlightData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addAirFlight = (req, res) => {
  try {
    const {
      flightNumber,
      airlineDetails,
      depatureTime,
      arrivalTime,
      duration,
    } = req.body;

    const createdRecord = new AirlineFlightsModel({
      flightNumber: flightNumber,
      airlineDetails: airlineDetails,
      depatureTime: depatureTime,
      arrivalTime: arrivalTime,
      duration: duration,
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

export const deleteAirFlight = async (req, res) => {
  try {
    const flightID = req.params.flightID;

    const flightData = await AirlineFlightsModel.deleteOne({ _id: flightID });
    if (flightData) {
      return res.status(200).json({
        message: "Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateAirFlight = async (req, res) => {
  try {
    const flightID = req.params.flightID;

    const {
      flightNumber,
      airlineDetails,
      depatureTime,
      arrivalTime,
      duration,
    } = req.body;

    const createdRecord = await AirlineFlightsModel.updateOne(
      { _id: flightID },
      {
        $set: {
          flightNumber: flightNumber,
          airlineDetails: airlineDetails,
          depatureTime: depatureTime,
          arrivalTime: arrivalTime,
          duration: duration,
        },
      }
    );

    if (createdRecord.acknowledged) {
      return res.status(200).json({
        data: createdRecord,
        message: "updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
