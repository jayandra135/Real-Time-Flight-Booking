import UserModel from "../model/user.model";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    const subFolder = "users";

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

export const getAllUsers = async (req, res) => {
  try {
    const userData = await UserModel.find();
    if (userData) {
      return res.status(200).json({
        data: userData,
        message: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userData = await UserModel.findOne({ _id: userId });
    if (userData) {
      return res.status(200).json({
        data: userData,
        message: "success",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const addUser = (req, res) => {
  try {
    const uploadData = upload.single("avatar");
    uploadData(req, res, function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const {
        firstName,
        lastName,
        email,
        password,
        contact,
        dob,
        gender,
        otp,
        status,
      } = req.body;

      let avatar = null;

      if (req.file !== undefined) {
        avatar = req.file.filename;
      }

      const createdRecord = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        contact: contact,
        dob: dob,
        gender: gender,
        otp: otp,
        status: status,
        avatar: avatar,
      });
      createdRecord.save();
      if (createdRecord) {
        return res.status(201).json({
          data: createdRecord,
          message: "Success",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.userID;

    const userAvatar = await UserModel.findOne({ _id: userID });
    if (fs.existsSync("./uploads/users/" + userAvatar.avatar)) {
      fs.unlinkSync("./uploads/users/" + userAvatar.avatar);
    }

    const deleteUser = await UserModel.deleteOne({ _id: userID });

    if (deleteUser) {
      return res.status(200).json({
        message: "delete user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const uploadData = upload.single("avatar");

    uploadData(req, res, async function (error) {
      if (error) return res.status(400).json({ message: err.message });

      const userID = req.params.userID;

      const { firstName, lastName, email, password, contact, dob, gender } =
        req.body;

      const userData = await UserModel.findOne({ _id: userID });
      let userAvatar = userData.avatar;

      if (req.file !== undefined) {
        userAvatar = req.file.filename;
        if (fs.existsSync("./uploads/users/" + userData.userAvatar)) {
          fs.unlinkSync("./uploads/users/" + userData.userAvatar);
        }
      }

      const updatedData = await UserModel.updateOne(
        { _id: userID },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            contact: contact,
            dob: dob,
            gender: gender,
            avatar: userAvatar,
          },
        }
      );

      if (updatedData.acknowledged) {
        return res.status(200).json({
          data: updatedData,
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
