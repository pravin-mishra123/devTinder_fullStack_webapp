const mongoose = require("mongoose");

// creating schema
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

// schema pre in mongoose
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //   // check if the fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to self!");
  }
  next();
});

// compund indexing
// ConnectionRequestSchema.find({fromUserId:jk2hjk3y923, toUserId:akljshkjdh203})
connectionRequestSchema.index({fromUserId:1,toUserId:1})

// creating model
const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
