const Article = require("../../models/article.model");
const NcaaPlayers = require("../../models/thirdPartySchema/ncaa_player.model");
const NcaaTeam = require("../../models/thirdPartySchema/ncaa_team.model");
const News = require("../../models/thirdPartySchema/news.model");
const NflPlayers = require("../../models/thirdPartySchema/nfl_player.model");
const nfl_team = require("../../models/thirdPartySchema/nfl_team.model");
const { sendResponseData, getFilePath } = require("../../util/Utility");


const getTeamListSearch = async (req, res) => {
    let searchText = req.query.search;
    const searchQueryArr = [];

    try {
        if (searchText) {
            searchQueryArr.push({ team_name: { $regex: searchText, $options: 'i' } });
        }
        const searchQuery = searchQueryArr.length ? { $or: searchQueryArr } : {};

        const nflTeamList = await nfl_team.aggregate([
            { $match: { status: true } },
            { $match: searchQuery },
            { $limit: 6 },
        ])
        const ncaaTeamList = await NcaaTeam.aggregate([
            { $match: { status: true } },
            { $match: searchQuery },
            { $limit: 6 },
        ])

        sendResponseData(res, 200, true, "Team list", { nflTeamList, ncaaTeamList });
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}



const getPlayerListSearch = async (req, res) => {
    let searchText = req.query.search;
    const searchQueryArr = [];

    try {
        if (searchText) {
            searchQueryArr.push({ name: { $regex: searchText, $options: 'i' } });
        }
        const searchQuery = searchQueryArr.length ? { $or: searchQueryArr } : {};

        const nflPlayerList = await NflPlayers.aggregate([
            { $match: { status: true } },
            { $match: searchQuery },
            { $limit: 6 },
        ]);
        nflPlayerList.forEach(element => {
            element.profile_img = getFilePath(element.profile_img, 'nfl_players', 'player');
        });

        const ncaaPlayerList = await NcaaPlayers.aggregate([
            { $match: { status: true } },
            { $match: searchQuery },
            { $limit: 6 },
        ]);
        ncaaPlayerList.forEach(element => {
            element.profile_img = getFilePath(element.profile_img, 'ncaaf_players', 'player');
        });

        sendResponseData(res, 200, true, "Player list", { nflPlayerList, ncaaPlayerList });
    } catch (error) {
        sendResponseData(res, 200, false, "Error", error);
    }
}



const getArticleListSearch = async (req, res) => {
    const searchQueryArr = [];

    try {
        const searchText = req.query.search;
        if (searchText) {
            searchQueryArr.push({ title: { $regex: searchText, $options: 'i' } });
            searchQueryArr.push({ author_name: { $regex: searchText, $options: 'i' } });
            searchQueryArr.push({ sub_title: { $regex: searchText, $options: 'i' } });
            searchQueryArr.push({ description: { $regex: searchText, $options: 'i' } });
        }

        const searchQuery = searchQueryArr.length ? { $or: searchQueryArr } : {};

        const articleList = await Article.aggregate([
            { $match: { isDelete: false } },
            { $match: searchQuery },
            { $sort: { created_at: -1 } },
            { $limit: 12 }, //static only 12 data will be displayed in ui
        ])

        articleList.forEach((element) => {
            element.thumbnail = getFilePath(element.thumbnail);
        })

        sendResponseData(res, 200, true, "List of Article", articleList);
    }
    catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "Error", error);
    }
}


const getNewsListSearch = async (req, res) => {
    const searchQueryArr = [];

    try {
        const searchText = req.query.search;
        if (searchText) {
            searchQueryArr.push({ article_headline: { $regex: searchText, $options: 'i' } });
            searchQueryArr.push({ article_excerpt: { $regex: searchText, $options: 'i' } });
        }

        const searchQuery = searchQueryArr.length ? { $or: searchQueryArr } : {};

        const newsList = await News.aggregate([
            { $match: { isDelete: false } },
            { $match: searchQuery },
            { $sort: { article_date: -1 } },
            { $limit: 12 }, //static only 12 data will be displayed in ui
        ])

        sendResponseData(res, 200, true, "List of News", newsList);
    }
    catch (error) {
        console.log(error);
        sendResponseData(res, 200, false, "Error", error);
    }
}



module.exports = {
    getTeamListSearch,
    getPlayerListSearch,
    getArticleListSearch,
    getNewsListSearch,

};
