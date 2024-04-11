import getVideosId from "./videoIds.ts";
import client from "../api/client.ts";
import {Video} from "../models/Video.ts"
async function getVideosMetadata() : Promise<(Video | null | undefined)[]> {
  const videosIdArray = await getVideosId();

  const filteredVideosIdArray: string[] = videosIdArray.filter(
    (videoId): videoId is string => typeof videoId === "string"
  );

  try {
    const response = await client.videos.list({
      part: ["snippet,statistics"],
      id: filteredVideosIdArray,
    });

    if (!response.data.items) {
      return [];
    } else {
      const videosMetadata = response.data.items.map(
        ({ id, snippet, statistics }) => ({
          videoId: id,
          publishedAt: snippet ? snippet.publishedAt : "",
          likeCount: statistics ? statistics.likeCount : 0,
          viewCount: statistics ? statistics.viewCount : 0,
        })
      );
      return videosMetadata;
    }
  } catch (err) {
    console.error("Error searching metada videos:", err);
    return [];
  }
}

export default getVideosMetadata;
