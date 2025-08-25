const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const mailSender = require('../../mailSetup/mail');


const { sendResponseData, getFilePath, generateValidationErrorResponse, fileUpload } = require("../../util/Utility");
const User = require("../../models/user.model");
const UserPodcast = require("../../models/user_podcast.model");


const userProfile = async (req, res) => {
      try {
            const userId = req.user_id;
            var userData = await User.findOne({ _id: userId });
            if (userData != null) {
                  userData.profile_img = getFilePath(userData.profile_img);
            }

            sendResponseData(res, 200, true, "user details", userData);
      } catch (error) {
            sendResponseData(res, 200, false, "Error", error);
      }
}


const updateUserProfile = async (req, res) => {
      try {
            const userId = req.user_id;
            const { full_name, gander, age } = req.body;

            var profileImg = '';
            if (req.files) {
                  if (req.files.image_path) {
                        var imgFile = req.files.image_path[0];
                        profileImg = await fileUpload(imgFile, 'user', 'Pimage');
                  }
            }

            var userData = await User.findOne({ _id: userId });
            if (userData) {
                  userData.full_name = full_name;
                  userData.gander = gander;
                  userData.age = age;
                  if(profileImg != ''){
                        userData.profile_img = profileImg;
                  }
                  const saveUserData = await userData.save({ validateModifiedOnly: true });

                  var userDataFetch = await User.findOne({ _id: userId });
                  userDataFetch.profile_img = getFilePath(userDataFetch.profile_img);
                  sendResponseData(res, 200, true, "Profile updated successfully.", userDataFetch);
            } else {
                  sendResponseData(res, 200, false, "User not found", {});
            }
      } catch (error) {
            console.log(error);
            sendResponseData(res, 200, false, "Error", error);
      }
}


const changePassword = async (req, res) => {
      try {
            const userId = req.user_id;
            const { password, oldPassword } = req.body;

            var userData = await User.findOne({ _id: userId });
            if (userData) {
                  const isMatch = await bcrypt.compare(oldPassword, userData.password);
                  if (isMatch) {
                        userData.password = password;
                        const savePassword = await userData.save({ validateModifiedOnly: true });

                        sendResponseData(res, 200, true, "Your password has been changed", {});
                  } else {
                        sendResponseData(res, 200, false, "Old password is not correct", {});
                  }
            } else {
                  sendResponseData(res, 200, false, "User not found", {});
            }
      }
      catch (error) {
            sendResponseData(res, 200, false, "Error", error);
      }
}

const addFavPodcast = async (req, res) => {
      try {
            const userId = req.user_id;
            const podcast_id = req.body.podcast_id;
            const isFavourite = req.body.isFavourite;

            if (isFavourite == true) {
                  let checkFavListPresent = await UserPodcast.find({ user_id: userId });

                  if (checkFavListPresent && checkFavListPresent.length > 0) {
                        let checkSameEntry = await UserPodcast.find({
                              $and: [{ user_id: userId }, { podcast_id: { $in: [podcast_id] } }]
                        })
                        // console.log("hfghjgdhjgjfk", checkSameEntry);
                        if (checkSameEntry && checkSameEntry.length > 0) {
                              sendResponseData(res, 200, false, "this podcast is already added to your favourite list", {});

                        }
                        else {

                              let favListUpdate = await UserPodcast.findOneAndUpdate({ user_id: userId },
                                    { $push: { podcast_id: podcast_id } });

                              sendResponseData(res, 200, true, "this podcast is added to your favourite list", {});
                        }


                  }
                  else {
                        let dataToSave = new UserPodcast({
                              user_id: userId,
                              podcast_id: podcast_id
                        })
                        let addToFav = await dataToSave.save();

                        sendResponseData(res, 200, true, "this podcast is added to your favourite list", {});
                  }

            }
            else {
                  let removeFavList = await UserPodcast.findOneAndUpdate({ user_id: userId },
                        { $pull: { podcast_id: podcast_id } });

                  sendResponseData(res, 200, true, "this podcast is remove from your favourite list", {});

            }


      }
      catch (error) {
            sendResponseData(res, 200, false, "Error", error);

      }

}

const favPodcastList = async (req, res) => {
      try {
            const userId = req.user_id;
            const favList = await UserPodcast.find({ user_id: userId }).populate('podcast_id');

            favList.forEach((element) => {
                  element.podcast_id.forEach((item) => {
                        item.image = getFilePath(item.image);
                        item.audio = getFilePath(item.audio);
                  })
            });

            sendResponseData(res, 200, true, "Your favourite podcast list", favList);


      }
      catch (error) {
            sendResponseData(res, 200, false, "Error", error);

      }
}



module.exports = { userProfile, updateUserProfile, changePassword, addFavPodcast, favPodcastList }