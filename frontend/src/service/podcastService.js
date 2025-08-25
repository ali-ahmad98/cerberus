import webApi from "../WebApi/WebApi";

export const getAllPodcastlist = async (onSuccess, onFailure) => {
  try {
    const res = await webApi.get(`/podcastlist`);
    if (res.status === 200) {
      const r = res.data;
      let podcastlist = [];
      r.response_data.map((r) => {
        podcastlist.push({
          audio: r.audio,
          image: r.image,
          title: r.title,
          sub_title: r.sub_title,
          podcast_time: r.podcast_time,
        });
      });
      if (podcastlist.length) {
        return onSuccess(podcastlist);
      } else {
        return onFailure?.("No Data Found");
      }
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};
