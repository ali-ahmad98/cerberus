const bcrypt = require("bcryptjs");

const { sendResponseData, generateToken, getFilePath } = require("../../util/Utility");
const User = require("../../models/user.model");

const createAdminUser = async (req, res) => {
      try{
            const newUser = new User({
                  email: req.body.email,
                  password: req.body.password,
                  user_type: 1,
                  otp: Math.floor(Math.random() * (999 - 100) + 100)
            });
            const userData = await newUser.save({ validateBeforeSave: false });

            sendResponseData(res, 200, true, "User added successfully", userData);
      }catch(error){
            sendResponseData(res, 200, false, "Error", error);
      }
}


const adminLogin  = async (req, res) => {
      try{
            const email= req.body.email;
            const password= req.body.password;
            if(!email)
                 return sendResponseData(res, 200, false, "Email required", null);
            if(!password)
                  return sendResponseData(res, 200, false, "Password required", null);
            
            var userData = await User.findOne({ email : email, user_type: 1 });
            if(!userData){
                  sendResponseData(res, 200, false, "Invalid credentials", {});
                  }
                  else{
            const isMatch = await bcrypt.compare(password, userData.password);

            if(isMatch){
                  const userToken = await generateToken(userData._id); 
                  const userRow = {
                        _id: userData._id,
                        full_name: userData.full_name,
                        email: userData.email,
                        profile_img: getFilePath(userData.profile_img),
                        userToken: userToken
                      } 
                  sendResponseData(res, 200, true, "Login successfully", userRow);
            }else{
                  sendResponseData(res, 200, false, "Wrong username or password", {});
            }
      }
      }catch(error){
            console.log(error);
            sendResponseData(res, 200, false, "Error", error);
      }
}

module.exports = {createAdminUser, adminLogin}