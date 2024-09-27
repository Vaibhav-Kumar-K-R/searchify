import axios from "axios"
    const scholarapi=axios.create({
      baseURL:`https://api.serpdog.io`,
      headers:{}
    }) 
export default  scholarapi