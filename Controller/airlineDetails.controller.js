import AirlineDetailsModel from "../model/airlineDetails.model";
import path from "path";
import fs from "fs";
import multer from "multer";
import { error } from "console";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    const subFolder = "airline";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    const subFolderPath = path.join(uploadPath, subFolder);
    if (!fs.existsSync(subFolderPath)) {
      fs.mkdirSync(subFolderPath);
    }

    cb(null, subFolderPath);
  },
  filename: function (req, file, cb) {
    const name = file.originalname;

    const ext = path.extname(name);

    const nameArr = name.split(".");
    nameArr.pop();

    const fname = nameArr.join(".");

    const fullname = fname + "-" + Date.now() + ext;
    cb(null, fullname);
  },
});

const upload = multer({ storage: storage });

export const getAllAirlines = async (req, res) => {
  try {
    const flightData = await AirlineDetailsModel.find();

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

export const getSingleAirline = async (req, res) => {
  try {
    const flightID = req.params.flightID;

    const flightData = await AirlineDetailsModel.findOne({ _id: flightID });

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

export const addAirline = (req, res) => {
  try {
    const uploadData = upload.single("flightLogo");
    uploadData(req, res, function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const { flightName } = req.body;

      let flightLogo = null;

      if (req.file !== undefined) {
        flightLogo = req.file.filename;
      }

      const createdRecord = new AirlineDetailsModel({
        flightName: flightName,
        // flightNumber: flightNumber,
        flightLogo: flightLogo,
      });

      createdRecord.save();
      if (createdRecord) {
        return res.status(201).json({
          data: createdRecord,
          message: "success",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAirline = async (req, res) => {
  try {
    const flightID = req.params.flightID;

    const logo = await AirlineDetailsModel.findOne({ _id: flightID });

    if (fs.existsSync("./uploads/airline/" + logo.flightLogo)) {
      fs.unlinkSync("./uploads/airline/" + logo.flightLogo);
    }

    const removeFlight = await AirlineDetailsModel.deleteOne({ _id: flightID });

    if (removeFlight) {
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

export const updateAirline = async (req, res) => {
  try {
    const uploadData = upload.single("flightLogo");

    uploadData(req, res, async function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const flightID = req.params.flightID;

      const { flightName } = req.body;

      const flightData = await AirlineDetailsModel.findOne({ _id: flightID });

      let logo = flightData.flightLogo;
      console.log(logo);

      if (req.file !== undefined) {
        logo = req.file.filename;
        if (fs.existsSync("./uploads/airline/" + flightData.flightLogo)) {
          fs.unlinkSync("./uploads/airline/" + flightData.flightLogo);
        }
      }

      const updatedRecord = await AirlineDetailsModel.updateOne(
        {
          _id: flightID,
        },
        {
          $set: {
            flightName: flightName,
            flightLogo: logo,
          },
        }
      );

      if (updatedRecord.acknowledged) {
        return res.status(200).json({
          data: updatedRecord,
          message: "updated",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
