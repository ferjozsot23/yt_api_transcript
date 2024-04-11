import client from "../api/client.ts";
import { STACKBUILDERS_ID, MAX_RESULTS } from "../utils/constants.ts";

async function getVideosId(): Promise<(string | null | undefined)[]> {
  try {
    const response = await client.search.list({
      part: ["snippet"],
      channelId: STACKBUILDERS_ID,
      fields: "items/id/videoId",
      maxResults: MAX_RESULTS,
      type: ["d"],
      videoDuration: "any",
    });
    if (!response.data.items) {
      return [];
    } else {
      return response.data.items.map((item) =>
        !item.id ? "" : item.id.videoId
      );
    }
  } catch (err) {
    console.error("Error retrieving :", err);
    return [];
  }
}

export default getVideosId;