import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://kushwahvinay95_db_user:u5ZXMBrJtOsx4xZD@crm.mhtalu6.mongodb.net/crm"
    );

    if (connection) {
      console.log("Database is connected");
    } else {
      console.log("Not connected ");
    }
  } catch (error) {
    console.log("message", error);
  }
};
