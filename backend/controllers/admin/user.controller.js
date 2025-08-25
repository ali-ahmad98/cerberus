const Article = require("../../models/article.model");
const Faq = require("../../models/faq.model");
const Podcast = require("../../models/porcast.model");
const NcaaPlayers = require("../../models/thirdPartySchema/ncaa_player.model");
const NcaaTeam = require("../../models/thirdPartySchema/ncaa_team.model");
const NflPlayers = require("../../models/thirdPartySchema/nfl_player.model");
const nfl_team = require("../../models/thirdPartySchema/nfl_team.model");
const User = require("../../models/user.model");
const { sendResponseData, fileUpload, getFilePath } = require("../../util/Utility");

const dashboard = async (req, res) => {
      try {
            const userNo = await User.count({ user_type: 2 });
            const podcastNo = await Podcast.count();
            const faqNo = await Faq.count();
            const articleNo = await Article.count();
            const nflTeamsNo = await nfl_team.count();
            const nflPlayersNo = await NflPlayers.count();
            const ncaafTeamsNo = await NcaaTeam.count();
            const ncaafPlayerNo = await NcaaPlayers.count();

            sendResponseData(res, 200, true, "Dashboard", {
                  userNo,
                  podcastNo,
                  faqNo,
                  articleNo,
                  nflTeamsNo,
                  nflPlayersNo,
                  ncaafTeamsNo,
                  ncaafPlayerNo
            });
      } catch (error) {
            sendResponseData(res, 200, false, "Error", error);
      }
};

const myProfile = async (req, res) => {
      const id = req.params.id;
      try {
            const userData = await User.findOne({ _id: id });
            userData.profile_img = getFilePath(userData.profile_img);
            sendResponseData(res, 200, true, "My Data", userData);
      } catch (error) {
            sendResponseData(res, 200, false, "Error", error);
      }
};

const updateMyProfile = async (req, res) => {
      const id = req.body.id;
      try {
            const errors = {};

            if (!String(req.body.full_name).trim()) {
                  errors.full_name = "Name is required";
                  sendResponseData(res, 200, false, "Validation Error", errors);
            }
            const rowData = await User.findOne({ _id: id });
            var profile_imgPath = rowData.profile_img;

            var imgFileName = profile_imgPath;

            if (req.files) {

                  if (req.files.profile_img) {
                        var imgFile = req.files.profile_img[0];
                        imgFileName = await fileUpload(imgFile, "user", "profile_img");
                  }
            }
            const userData = {
                  full_name: req.body.full_name,
                  profile_img: imgFileName,
            };
            const updateData = await User.updateOne({ _id: id }, userData);
            userData.profile_img = getFilePath(imgFileName);
            sendResponseData(res, 200, true, "Update Successfully.", userData);
      } catch (error) {
            sendResponseData(res, 200, false, "Error", error);
      }
};

const userList = async (req, res) => {
      try {
            const userList = await User.find({ user_type: 2 }).sort({ created_at: -1 });
            sendResponseData(res, 200, true, "User list", userList);
      } catch (error) {
            sendResponseData(res, 200, false, "Error", error);
      }
};



const usersChart = async (req, res) => {
      try {
            const dataList = await User.aggregate([
                  { $group: { _id: { $dateToString: { format: "%m-%Y", date: "$created_at" } }, counter: { $sum: 1 } } },
                  { $sort: { created_at: -1 } },
                  { $limit: 100 },
            ]).exec();

            sendResponseData(res, 200, true, "User count", dataList);
      } catch (error) {
            sendResponseData(res, 200, false, "Error", error);
      }
};

module.exports = { dashboard, myProfile, updateMyProfile, userList, usersChart };
