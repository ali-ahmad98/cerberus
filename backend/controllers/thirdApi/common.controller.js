const apiFunctions = require("./api.functions");
const { sendResponseData, fileUpload, getFilePath } = require("../../util/Utility");

const News = require("../../models/thirdPartySchema/news.model");
const NflTeam = require("../../models/thirdPartySchema/nfl_team.model");
const NflPlayers = require("../../models/thirdPartySchema/nfl_player.model");


const apiDataSave = async (req, res) => {
    try {
        // const newsData = await apiFunctions.newsSave();
        const nflScheduleSave = await apiFunctions.nflScheduleSave();
        // const nflTeamSave = await apiFunctions.nflTeamSave();

        // console.log("newsData",nflTeamSave);

        sendResponseData(res, 200, true, "Data updated from third party api",);

    }
    catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "Error", error);
    }


}

const listOfNews = async (req, res) => {
    const searchQueryArr = [];

    try {
        const searchText = req.query.search;
        if (searchText) {
            searchQueryArr.push({ article_headline: { $regex: searchText, $options: 'i' } });
            searchQueryArr.push({ article_excerpt: { $regex: searchText, $options: 'i' } });
        }

        const searchQuery = searchQueryArr.length ? { $or: searchQueryArr } : {};
        console.log("searchQueryArr", searchQuery);

        const newsList = await News.aggregate([
            { $match: { isDelete: false } },
            { $match: searchQuery },
            { $sort: { article_date: -1 } },
            { $limit: 35 }, //static only 35 data will be displayed in ui
        ])

        if (newsList.length == 0) {
            sendResponseData(res, 200, true, "No data found", []);
        }
        else {
            sendResponseData(res, 200, true, "List of News", newsList);
        }
    }
    catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "Error", error);
    }
}

const teamSaveUpdateData = async (req, res) => {

    try {
        const teamSaveUpdateData = await apiFunctions.teamSaveUpdateData();
        sendResponseData(res, 200, true, "Data updated from third party api", teamSaveUpdateData);
    }
    catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "Error", error);
    }


}

const ncaaDataSave = async (req, res) => {
    try {
        // const newsData = await apiFunctions.newsSave();
        const ncaaScheduleSave = await apiFunctions.ncaaDataSave();
        // const nflTeamSave = await apiFunctions.nflTeamSave();

        // console.log("newsData",nflTeamSave);

        sendResponseData(res, 200, true, "Data updated from third party api", ncaaScheduleSave);

    }
    catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "Error", error);
    }

}

const upadateNewsData = async (req, res) => {
    try {

        let teams = await NflTeam.find({ isDelete: false, status: true });
        // let players = await NflPlayers.find({status:true});

        let newsData = await News.find({ isDelete: false });

        newsData.forEach(async (each) => {
            if (each.teams.length > 0) {
                each.teams.forEach((item) => {
                    teamData = teams.find(team => team.team_code === item)
                    // console.log("teamData",teamData);
                    teamLogo = teamData ? teamData.logo_standard : '';
                })

                console.log("teamLogo", teamLogo);

                let update = await News.updateOne({ _id: each._id }, { team_imgs: teamLogo, player_imgs: '' });
            }
            else if (each.article_excerpt) {
                let splitdata = each.article_excerpt.split(" ");
                console.log("splitdata", splitdata);

                let players = await NflPlayers.findOne({ name: { $in: splitdata } });
                console.log("players", players);

                playerImg = players ? players.profile_img : '';

                let update = await News.updateOne({ _id: each._id }, { player_imgs: playerImg, team_imgs: '' });

            }
            else if (each.article_headline) {
                let splitdata = each.article_excerpt.split(" ");
                console.log("splitdata", splitdata);

                let players = await NflPlayers.findOne({ name: { $in: splitdata } });
                console.log("players", players);

                playerImg = players ? players.profile_img : '';

                let update = await News.updateOne({ _id: each._id }, { player_imgs: playerImg, team_imgs: '' });



            }

        })
        // console.log("dhsjtgfhdghfj",teams.length,players.length);

        sendResponseData(res, 200, true, "news data update", {})

    }
    catch (error) {
        sendResponseData(res, 200, false, "some error", {});
    }

}

module.exports = {
    apiDataSave,
    listOfNews,
    teamSaveUpdateData,
    ncaaDataSave,
    upadateNewsData
}