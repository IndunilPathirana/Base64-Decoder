const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// bring send msg controller
const sendmsgcontroller = require("../../controllers/sendmsg");

// @route   POST api/decoder
// @desc    decode base encoded string
// @access  Public
router.post("/", [
  body("tophone", "phon number is required").not().isEmpty(),
  body("content", "content is required").not().isEmpty(),

  sendmsgcontroller.sendmsg,
]);

module.exports = router;
