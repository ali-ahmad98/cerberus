import webApi from "../WebApi/WebApi";

export const getNcaaTeamListApi = async (data) => {
    return await webApi.get('getNcaaTeamList');
} 
export const getNcaaTeamListGrApi = async (data) => {
    return await webApi.get('getNcaaTeamListGr');
} 
export const getNcaaTeamDetailsApi = async (teamId) => {
    return await webApi.get('getNcaaTeamDetails/'+ teamId);
} 
export const getNcaaTeamLeaderByTeamIdApi = async (teamId, yearNo) => {
    return await webApi.get('getNcaaTeamLeaderByTeamId?team=' + teamId + "&year=" + yearNo);
} 
export const getNcaaPlayerStatByTeamIdApi = async (teamId, yearNo) => {
    return await webApi.get('getNcaaPlayerStatByTeamId?team=' + teamId + "&year=" + yearNo);
} 

export const ncaaPlayerDetailsApi = async (playerId) => {
    return await webApi.get('ncaaPlayerDetails/' + playerId);
}

export const ncaaPlayerGameLogApi = async (playerId, yearNo) => {
    return await webApi.get('getNcaaPlayerGameLog?playerId=' + playerId + '&year=' + yearNo);
}


export const checkFollowNcaaTeamApi = async (teamId, userId, teamType) => {
    return await webApi.get('checkFollowTeam?teamId=' + teamId + "&userId=" + userId + "&teamType=" + teamType);
}
export const followNcaaTeamApi = async (teamId, userId, teamType) => {
    return await webApi.get('followTeam?teamId=' + teamId + "&userId=" + userId + "&teamType=" + teamType);
}


export const getTeamRankingListApi = async () => {
    return await webApi.get('getNcaaTeamRanking');
}

