const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

var md5 = require("md5");

// bring user model
const ImageData = require("../models/Imagedata");

//decoding baseencoded string

exports.baseencodedstringdecoder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imagebuffer, imageid } = req.body;

    //  hash image
    const hashimage = md5(imagebuffer);
    // see if user exixts
    let image = await ImageData.findOne({ hashimage: hashimage });

    if (!image) {
      image = new ImageData({
        imageid,
        hashimage,
      });

      console.log("image does not exsit");

      // save the user to database
      await image.save();
      res.status(200).json({
        errors: [
          { msg: "Image does not exsist saved to database successfully" },
        ],
      });
    } else {
      res.status(400).json({
        errors: [{ msg: "image alrady exsist" }],
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error decoding");
  }
};
