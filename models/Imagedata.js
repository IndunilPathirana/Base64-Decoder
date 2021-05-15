const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageid: {
    type: String,
    required: true,
  },
  hashimage: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("image", imageSchema);
