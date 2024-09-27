import axios from "axios"
  const apikey=process.env.SEARCH_API_KEY
    const customsearchapi=axios.create({
      baseURL:"https://www.googleapis.com/customsearch",
      params:{
        key:apikey,
        cx:ProcessingInstruction.env.CX
      },
      headers:{}
    }) 
export default  customsearchapi