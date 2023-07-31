import FlightsModel from "../model/flights.model";
import ReviewBookModel from "../model/reviewBook.model";

export const getBookings = async (req, res) => {
  try {
    const userID = req.params.userID;
    const BookingData = await ReviewBookModel.findOne({ userID: userID });

    if (BookingData) {
      return res.status(200).json({
        data: BookingData,
        message: "Cart Items",
        result: BookingData.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addToBook = async (req, res) => {
  try {
    const { userid, flightid } = req.body;

    const flightData = await FlightsModel.findOne({ _id: flightid });

    const existBooking = await ReviewBookModel.findOne({
      flightsID: flightid,
      userID: userid,
    });

    let adults = 0,
      total = 0;
    if (existBooking) {
      adults = existBooking.adult + 1;
      total = flightData.price * adults;
      console.log(total);

      let updatedBooking = await ReviewBookModel.updateOne(
        {
          _id: existBooking._id,
        },
        {
          $set: {
            adult: adults,
            grandTotal: total,
          },
        }
      );
      if (updatedBooking.acknowledged) {
        return res.status(200).json({
          message: "updated",
        });
      }
    }

    const bookData = new ReviewBookModel({
      userID: userid,
      flightsID: flightid,
      //   price: flightData.price,
      //   travelClass: flightData.travelClass,
      //   adult: adults,
      //   child: flightData.child,
      //   grandTotal: total,
    });
    bookData.save();
    if (bookData) {
      return res.status(201).json({
        data: bookData,
        message: "Successfully added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const removeFromBooked = async (req, res) => {
  try {
    const bookID = req.params.bookID;

    let removeBook = await ReviewBookModel.deleteOne({ _id: bookID });

    if (removeBook) {
      return res.status(200).json({
        data: removeBook,
        message: "deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePasseneger = async (req, res) => {
  try {
    const bookID = req.params.bookID;
    console.log(bookID);
    const { adultinc, childinc, travelClass } = req.query;
    const { flightid } = req.body;

    const bookData = await ReviewBookModel.findOne({ _id: bookID });

    const flightData = await FlightsModel.findOne({ _id: flightid });

    let adult = bookData.adult;
    let child = bookData.child;
    let price = flightData.price;

    let grandTotal = bookData.grandTotal;

    let travel = flightData.travelClass;

    if (adultinc === "increment") {
      adult += 1;
      grandTotal = (child + adult) * price;
    }
    if (adultinc === "decrement") {
      adult -= 1;
      grandTotal = (child + adult) * price;
    }

    if (childinc === "increment") {
      child += 1;
      grandTotal = (child + adult) * price;
    }
    if (childinc === "decrement") {
      child -= 1;
      grandTotal = (child + adult) * price;
    }

    if (travelClass === "economy") {
      travel = "ecnomomy";
    }
    if (travelClass === "premium") {
      travel = "premium";
    }
    if (travelClass === "business") {
      travel = "business";
    }
    if (travelClass === "firstClass") {
      travel = "firstClass";
    }
    // console.log(grandTotal);
    const updatedPasseneger = await FlightsModel.updateMany(
      {},
      {
        $set: {
          adult: adult,
          child: child,
          travelClass: travel,
          grandTotal: grandTotal,
        },
      }
    );
    if (updatedPasseneger.acknowledged) {
      return res.status(200).json({
        message: "Updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
