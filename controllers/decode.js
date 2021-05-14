const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

//decoding baseencoded string

exports.baseencodedstringdecoder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);

    const { baseencoded, imgname } = req.body;

    // console.log(baseencoded);
    let buff = new Buffer(baseencoded, "base64");

    imagefilesavename = imgname.concat(".png");

    fs.writeFileSync(imagefilesavename, buff);

    let filepath = "../";

    filepath = filepath.concat(imagefilesavename);

    // let text = buff.toString("ascii");
    res.sendFile(path.join(__dirname, filepath));
    // res.send(buff);
    // res.status(200).json({ msg: text });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error decoding");
  }
};
