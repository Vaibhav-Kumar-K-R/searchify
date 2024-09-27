import axios from "axios"
  const apikey=process.env.YT_API
    const ytapi=axios.create({
      baseURL:`https://www.googleapis.com/youtube/v3`,
      params:{
        part:'snippet',
        maxResults:"5",
        key:apikey
      },
      headers:{}
    }) 
export default  ytapi