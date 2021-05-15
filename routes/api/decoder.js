const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// bring user controller
const decoderController = require("../../controllers/decode");

// @route   POST api/decoder
// @desc    decode base encoded string
// @access  Public
router.post("/", [
  body("imagebuffer", "byte string string is required").not().isEmpty(),
  body("imageid", "imageid is required").not().isEmpty(),

  decoderController.baseencodedstringdecoder,
]);

module.exports = router;
