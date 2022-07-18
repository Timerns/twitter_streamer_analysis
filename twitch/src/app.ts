import axios from 'axios';
import fs from "fs";
import dotenv from "dotenv"

dotenv.config()

export interface IhttpResponceTopStreamer {
   data: ItopStreamer[];
   pagination: {
       cursor: string;
   }
}
export interface ItopStreamer {
   id: string;
   user_id: string;
   user_login: string;
   user_name: string;
   game_id: string;
   game_name: string;
   type: string;
   title: string;
   viewer_count: number;
   started_at: any;
   language: string;
   thumbnail_url: string;
   tag_ids: string[];
   is_mature: boolean;
   thumbbnail_url: string;
}

async function getTopStreamer() {
   if (process.env.API_KEY && process.env.API_CLIENT_ID) {
      try {
         const { data } = await axios.get<IhttpResponceTopStreamer>("https://api.twitch.tv/helix/streams?first=100&language=fr", {
            headers: {
               'Authorization': process.env.API_KEY,
               'Client-Id': process.env.API_CLIENT_ID,
            }
         })
         var res = "";
         for (const streamer of data.data) {
            res += streamer.user_login + ","+ streamer.viewer_count + "\n";
         }
         return res;
      } catch (e) {
         return ""
      }
   }
   return ""
}

function storeData(res: string) {
   fs.writeFile("streamer.csv",  res, (err) => {
      if (err) console.log(err);
   });
}

const interval = setInterval(async () => {
   console.log("start top streamer")
   var res = await getTopStreamer();
   console.log("start loging")
   storeData(res);
   console.log("finish loging")
 }, 1800000);


