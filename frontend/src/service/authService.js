import webApi from "../WebApi/WebApi";

export const userRegistration = async (data) => {
    return await webApi.post('registration', data); 
}  


export const userLogin = async (data) => {
    return await webApi.post('login', data); 
}  

export const userFavPod = async (data) => {
    return await webApi.post('addFavRemovePodcast', data); 
}  


export const resetPasswordMail = async (data) => {
    return await webApi.post('resetPasswordMail', data); 
}  
export const resetPassword = async (data) => {
    return await webApi.post('resetPassword', data); 
}  