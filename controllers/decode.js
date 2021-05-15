const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

// bring user model
const ImageData = require("../models/Imagedata");

//decoding baseencoded string

exports.baseencodedstringdecoder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { baseencoded, imgname } = req.body;

    // see if user exixts
    let image = await ImageData.findOne({ imgname: imgname });

    if (!image) {
      image = new ImageData({
        imgname,
        baseencoded,
      });

      console.log(imgname);
      // Encrypth the baseencode
      const salt = await bcrypt.genSalt(10);
      image.baseencoded = await bcrypt.hash(baseencoded, salt);

      // save the user to database
      await image.save();
      res.status(200).json({
        errors: [
          { msg: "Image does not exsist saved to database successfully" },
        ],
      });
    } else {
      // check for the image comparrison
      const isMatch = await bcrypt.compare(baseencoded, image.baseencoded);

      if (!isMatch) {
        res.status(200).json({
          errors: [
            {
              msg: "image id is match but not same image content so if you want we can save image with same content",
            },
          ],
        });
      } else {
        res.status(200).json({
          errors: [{ msg: "image id is match and same image content" }],
        });
      }
    }
    image = new ImageData({
      imgname,
      baseencoded,
    });

    console.log(imgname);
    // Encrypth the baseencode
    const salt = await bcrypt.genSalt(10);
    image.baseencoded = await bcrypt.hash(baseencoded, salt);

    // save the user to database
    await image.save();

    // let buff = new Buffer(baseencoded, "base64");
    // imagefilesavename = imgname.concat(".png");

    // fs.writeFileSync(imagefilesavename, buff);

    // let filepath = "../";

    // filepath = filepath.concat(imagefilesavename);

    // // let text = buff.toString("ascii");
    // res.sendFile(path.join(__dirname, filepath));

    // res.send(buff);
    // res.status(200).json({ msg: text });

    return res.status(200).json({ msg: "image saved successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error decoding");
  }
};
