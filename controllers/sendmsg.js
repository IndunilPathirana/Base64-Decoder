const { validationResult } = require("express-validator");
const axios = require("axios");
const config = require("config");

// Account userID and Api Key sender ID
const userId = config.get("notify_user_id");
const api_key = config.get("notify_api_key");
const sender_id = config.get("notify_sender_id");

exports.sendmsg = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // see if mobile number exists
    const { tophone, content } = req.body;

    try {
      const res = await axios.post("https://app.notify.lk/api/v1/send", {
        user_id: userId,
        api_key: api_key,
        sender_id: sender_id,
        to: tophone,
        message: content,
      });
      console.log(res.data);
    } catch (err) {
      if (err.response) {
        // the request went through and a response was returned
        // status code in 3xx / 4xx / 5xx range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // request was made but server returned no response
        console.log(err.request);
      } else {
        // something went wrong in setting up the request
        console.error("Error:", err.message);
      }
    }

    res.status(200).send("msg sent");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
