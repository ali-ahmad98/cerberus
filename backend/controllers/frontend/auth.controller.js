const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const mailSender = require('../../mailSetup/mail');


const { sendResponseData, generateToken, generateValidationErrorResponse } = require("../../util/Utility");
const User = require("../../models/user.model");

const userRegistration = async (req, res) => {
      try {
            if (req.body.full_name == "" && req.body.phone == "" && req.body.email == "" && req.body.password == "") {
                  sendResponseData(res, 200, false, "Please fill up the form", {});
            }
            else if (req.body.full_name == "") {
                  sendResponseData(res, 200, false, "Name is require", {});
            }
            else if (req.body.phone == "") { sendResponseData(res, 200, false, "Phone number is require", {}); }
            else if (req.body.email == "") { sendResponseData(res, 200, false, "Email is require", {}); }
            else if (req.body.password == "") { sendResponseData(res, 200, false, "Password is require", {}); }
            else if (req.body.confirmPassword == "") { sendResponseData(res, 200, false, "Confirm Password is require", {}); }

            else {
                  const userCheck = await User.findOne({ email: req.body.email });
                  const userPhoneCheck = await User.findOne({ phone: req.body.phone });

                  if (userCheck) {
                        sendResponseData(res, 200, true, "Email has already exist!", {});

                  }
                  else if (userPhoneCheck) {
                        sendResponseData(res, 200, true, "Phone number has already exist!", {});
                  }
                  else {
                        const newUser = new User({
                              full_name: req.body.full_name,
                              phone: req.body.phone,
                              email: req.body.email,
                              password: req.body.password,
                              user_type: 2,
                              otp: Math.floor(Math.random() * (999 - 100) + 100)
                        });
                        const userData = await newUser.save();
                        mailSender('welcomeMail')(req.body.email,
                              {
                                    name: req.body.full_name,
                                    header_color: config.siteConfig.HEADERCOLOR,
                                    footer_color: config.siteConfig.FOOTERCOLOR,
                                    site_name: config.siteConfig.SITENAME,
                                    currentYear: new Date().getFullYear(),
                                    logo: config.siteConfig.LOGO
                              }).send();

                        sendResponseData(res, 200, true, "Registration has been successful.", userData);

                  }
            }

      } catch (error) {
            console.log(error);
            // sendResponseData(res, 200, false, "Error", error);
            await generateValidationErrorResponse(res, error);
      }
}


const userLogin = async (req, res) => {
      try {
            const email = req.body.email;
            const password = req.body.password;

            var userData = await User.findOne({ email: email, user_type: 2 });
            if (userData) {
                  const isMatch = await bcrypt.compare(password, userData.password);

                  if (isMatch) {
                        const userToken = await generateToken(userData._id);
                        const userRow = {
                              _id: userData._id,
                              email: userData.email,
                              full_name: userData.full_name,
                              userToken: userToken
                        }
                        sendResponseData(res, 200, true, "Login successfully", userRow);
                  } else {
                        sendResponseData(res, 200, false, "Wrong email or password", {});
                  }
            } else {
                  sendResponseData(res, 200, false, "User not found", {});
            }
      } catch (error) {
            sendResponseData(res, 200, false, "Error", error);
      }
}

 

const resetPasswordMail = async (req, res) => {
      try {
            const email = req.body.email;
            var userData = await User.findOne({ email: email, user_type: 2 });
            // console.log("userData",userData);

            if (userData) {
                  const token = jwt.sign({ email: email }, config.secretKey, { expiresIn: '5m' });
                  mailSender('resetPasswordMail')(email,
                        {
                              name: userData.full_name,
                              resetLink: config.websiteLink + "reset-password/" + token,
                              header_color: config.siteConfig.HEADERCOLOR,
                              footer_color: config.siteConfig.FOOTERCOLOR,
                              site_name: config.siteConfig.SITENAME,
                              currentYear: new Date().getFullYear(),
                              logo:config.siteConfig.LOGO
                        }).send();

                  sendResponseData(res, 200, true, "Reset link send to your mail", { token: token });

            } else {
                  sendResponseData(res, 200, false, "Sorry we can't find this user", {});
            }
      }
      catch (error) {
            console.log(error);
            sendResponseData(res, 200, false, "Error", error);

      }

}

const resetPassword = async (req, res) => {
      try {
            const token = req.body.token;
            const password = req.body.password;
            const cpassword = req.body.confirmPassword;


            jwt.verify(token, config.secretKey, async (err, decode) => {
                  // console.log("decodedToken",decode);
                  if (err) {
                        sendResponseData(res, 200, false, "Token expired", {});
                  }
                  else {
                        if (password != cpassword) {
                              sendResponseData(res, 200, false, "password and confirm password does not match", {});
                        }
                        else {
                              var userData = await User.findOne({ email: decode.email, user_type: 2 });
                              // console.log("userData", userData);
                              userData.password = password;
                              const savePassword = await userData.save({ validateModifiedOnly: true })


                              sendResponseData(res, 200, true, "Your password has been reset", {});
                        }

                  }

            });

      }
      catch (error) {
            console.log(error);
            sendResponseData(res, 200, false, "Error", error);

      }


}
 

module.exports = { userRegistration, userLogin, resetPasswordMail, resetPassword }