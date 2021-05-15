const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imgname: {
    type: String,
    required: true,
  },
  baseencoded: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("image", imageSchema);
