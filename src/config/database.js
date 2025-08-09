const mongoose = require("mongoose");


const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pravinmishra3344:xgTMFASDPPBcFQM6@namastenode.cushngx.mongodb.net/devTinderDB"
  );
};

module.exports = {
    connectDB,
}




