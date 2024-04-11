import { Video } from "../models/Video.ts";

function getTopLikedVideos(data: Video[]) {
  return data
    .sort((videoA: Video, videoB: Video) => videoB.likeCount - videoA.likeCount)
    .slice(0, 5);
}

/*
function getNewestVideos(data: Video[]) {
    return data
        .filter(video => video.publishedAt !== undefined && video.publishedAt !== null) // Filtrar videos con publishedAt definido
        .sort((videoA: Video, videoB: Video) =>
            new Date(videoB.publishedAt!).getTime() - new Date(videoA.publishedAt!).getTime()
        )
        .slice(0, 5);
}
*/

function getNewestVideos(data: Video[]) {
  return data
    .sort(
      (videoA: Video, videoB: Video) =>
        new Date(videoB.publishedAt).getTime() - new Date(videoA.publishedAt).getTime()
    )
    .slice(0, 5);
}


function getTotalLikes(data: Video[]) {
  return data.reduce(
    (total: number, video: Video) => total + video.likeCount,
    0
  );
}

function getTopViewedVideos(data: Video[]) {
  return data
    .sort((videoA, videoB) => videoB.viewCount - videoA.viewCount)
    .slice(0, 5);
}

export {
  getTopLikedVideos,
  getNewestVideos,
  getTotalLikes,
  getTopViewedVideos,
};
