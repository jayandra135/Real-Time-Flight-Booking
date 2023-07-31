import AirportDetailsModel from "../model/AirportDetails.model";

export const getAllAirports = async (req, res) => {
  try {
    const airportData = await AirportDetailsModel.find();

    if (airportData) {
      return res.status(200).json({
        data: airportData,
        message: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleAirport = async (req, res) => {
  try {
    const airportID = req.params.airportID;

    const airportData = await UserModel.findOne({ _id: airportID });
    if (airportData) {
      return res.status(200).json({
        data: airportData,
        message: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const addAirport = (req, res) => {
  try {
    const { state, city, country, airportName, shortName, terminal } = req.body;

    const createdRecord = new AirportDetailsModel({
      state: state,
      city: city,
      country: country,
      airportName: airportName,
      shortName: shortName,
      terminal: terminal,
    });
    createdRecord.save();

    if (createdRecord) {
      return res.status(201).json({
        data: createdRecord,
        message: "Success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const updateAirport = async (req, res) => {
  try {
    const airportID = req.params.airportID;
    const { state, city, country, airportName, shortName, terminal } = req.body;

    const airportData = await AirportDetailsModel.updateOne(
      { _id: airportID },
      {
        $set: {
          state: state,
          city: city,
          country: country,
          airportName: airportName,
          shortName: shortName,
          terminal: terminal,
        },
      }
    );
    if (airportData.acknowledged) {
      return res.status(200).json({
        data: airportData,
        message: "updated",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteAirport = async (req, res) => {
  try {
    const airportID = req.params.airportID;

    const airportData = await AirportDetailsModel.deleteOne({ _id: airportID });

    if (airportData) {
      return res.status(200).json({
        message: "deleted",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
