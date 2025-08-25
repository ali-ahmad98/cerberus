import webApi from "../WebApi/WebApi";

export const nflTeamListApi = async (data) => {
    return await webApi.get('nflTeamList');
}
export const nflcheckGameWeek = async (data) => {
    return await webApi.get('checkGameWeek');
}
export const nflPlayerPositionListApi = async (data) => {
    return await webApi.get('getNflFantasyPlayerPosition');
}
export const nflTeamListDropdownApi = async (data) => {
    return await webApi.get('nflTeamListDropdown');
}

export const ncaafTeamListDropdownApi = async (data) => {
    return await webApi.get('getNcaaTeamList');
}
export const nflTeamListDivisionGroupApi = async () => {
    return await webApi.get('nflTeamListDivisionGroup');
}

export const nflTeamDetailsByTeamIdApi = async (teamId) => {
    return await webApi.get('nflTeamDetailsByTeamId/' + teamId);
}

export const ncaafTeamDetailsByTeamIdApi = async (teamId) => {
    return await webApi.get('getNcaaTeamDetails/' + teamId);
}

export const nflPlayerDetailsApi = async (playerId) => {
    return await webApi.get('nflPlayerDetails/' + playerId);
}

export const getNflPlayerGameLogApi = async (playerId, yearNo) => {
    return await webApi.get('getNflPlayerGameLog?playerId=' + playerId + '&year=' + yearNo);
}


export const getNflTeamLeaderByTeamIdApi = async (teamId, yearNo) => {
    return await webApi.get('getNflTeamLeaderByTeamId?team=' + teamId + "&year=" + yearNo);
}

export const getNflPlayerStatByTeamIdApi = async (teamId, yearNo) => {
    return await webApi.get('getNflPlayerStatByTeamId?team=' + teamId + "&year=" + yearNo);
}

export const getNflTeamStatByTeamIdApi = async (teamId, yearNo) => {
    return await webApi.get('getNflTeamStatByTeamId?teamId=' + teamId + "&year=" + yearNo);
}

export const getNflInjuriesListApi = async (teamId) => {
    return await webApi.get('getNflInjuriesByTeamId?teamId=' + teamId);
}

export const getNcaafInjuriesListApi = async (teamId) => {
    return await webApi.get('getNflInjuriesByTeamId?teamId=' + teamId);
}
export const getNflRosterByTeamIdApi = async (teamId, yearNo) => {
    return await webApi.get('getNflRosterByTeamId?teamId=' + teamId + "&year=" + yearNo);
}

export const getNflDepthChartByTeamIdApi = async (teamId, yearNo) => {
    return await webApi.get('getNflDepthChartByTeam?teamId=' + teamId  );
}

export const getNflPlayerStatLeaderListApi = async (teamId, yearNo) => {
    return await webApi.get('getNflPlayerStatLeaderList?teamId=' + teamId + "&year=" + yearNo);
}

export const checkFollowNflTeamApi = async (teamId, userId, teamType) => {
    return await webApi.get('checkFollowTeam?teamId=' + teamId + "&userId=" + userId + "&teamType=" + teamType);
}
export const followNflTeamApi = async (teamId, userId, teamType) => {
    return await webApi.get('followTeam?teamId=' + teamId + "&userId=" + userId + "&teamType=" + teamType);
}



export const getPlayerProfileHighlightArticleApi = async () => {
    return await webApi.get('getPlayerProfileHighlightArticle');
}


