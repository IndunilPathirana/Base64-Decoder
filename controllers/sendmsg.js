// const { validationResult } = require("express-validator");
// const axios = require("axios");

// // Account userID and Api Key sender ID
// const userId = config.get("notify_user_id");
// const api_key = config.get("notify_api_key");
// const sender_id = config.get("notify_sender_id");

// exports.sendOTP = async(req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         // see if mobile number exists
//         const {tophone,con = req.body.mobile;

//         try {
//             // Encrypth the otp code
//             const salt = await bcrypt.genSalt(10);
//             otp_code = await bcrypt.hash(otpcode, salt);

//             // Build otp Object
//             const otpFields = {};
//             otpFields.mobile = mobile;
//             otpFields.otp_code = otp_code;
//             otpFields.otp_time = Date.now();

//             //Add new otp
//             otp = new OTP(otpFields);

//             // save the otp code to database
//             await otp.save();

//             const res = await axios.post("https://app.notify.lk/api/v1/send", {
//                 user_id: userId,
//                 api_key: api_key,
//                 sender_id: sender_id,
//                 to: mobile,
//                 message: otpcode,
//             });
//             console.log(res.data);
//         } catch (err) {
//             if (err.response) {
//                 // the request went through and a response was returned
//                 // status code in 3xx / 4xx / 5xx range
//                 console.log(err.response.data);
//                 console.log(err.response.status);
//                 console.log(err.response.headers);
//             } else if (err.request) {
//                 // request was made but server returned no response
//                 console.log(err.request);
//             } else {
//                 // something went wrong in setting up the request
//                 console.error("Error:", err.message);
//             }
//         }

//         res.status(200).send("OTP sent");
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server error");
//     }
// };
