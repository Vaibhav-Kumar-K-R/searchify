import {useRef, useState } from "react"
import ytapi from "../utils/fetchytdata"
import ClipLoader from "react-spinners/ClipLoader";
import customsearchapi from "../utils/fetchcssearchdata"
import YtResponseCard from "./components/YtResponseCard"
import scholarapi from "../utils/fetchscolardata"
function App() {

  const [searchinput,setsearchinput]=useState("")
  const ytref=useRef()
  const scholarref=useRef()
  const csref=useRef()
  const [ytdataresponse,setytdatareponse]=useState<object[]>([])
  const [customsearchdata,setcustomsearchdata]=useState<object[]>([])
  const [scholardata,setscholardata]=useState<object[]>([])
  const [loading,setloading]=useState(false)
  const [ytchecked,setytchecked]=useState(!true)
  const [csearchchecked,setcsearchchecked]=useState(!true)
  const [scholarchecked,setscholarchecked]=useState(!true)
  const fetchalldata=async()=>{

    try {  
      if(searchinput!=""){
      setloading(true)
      if(ytchecked){
        const ytresponse=await ytapi.get('/search',{
            params:{
              q:searchinput,
              type:"video",
              order:"relevance",
            }
          })
        setytdatareponse(ytresponse.data.items)
      }
      if(csearchchecked){
        const customsearchresponse=await customsearchapi.get(`/v1?q=${searchinput}`)
        setcustomsearchdata(customsearchresponse.data.items)
        console.log(customsearchdata);
        
      }
      if(scholarchecked){

        const scholarresponsedata=await scholarapi.get(`/scholar?api_key=${process.env.SCHOLAR_API_KEY}&q=${searchinput}`)
        setscholardata(scholarresponsedata.data.scholar_results)
      }
    }
    setloading(false)
    } catch (error) {
      alert("Error in fetching search data!!Try again")
    }
  }
    if(loading){
      return   <ClipLoader
      color={"blue"}
      loading={loading}
      cssOverride={{
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      }}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    }
  return (
    <div>
        <div className="flex gap-2 justify-center items-center h-14 bg-red-500">
          <input type="search" className="w-10/12 p-2 border  rounded-sm" placeholder="Select the resources and enter your search here" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setsearchinput(e.target.value)
          }} />
          <button className="p-1 bg-black text-white px-3  border-0 rounded-md" onClick={fetchalldata}>Go</button>
        </div>
        <div className="w-full gap-4 text-lg flex justify-center items-center h-fit ">
          <div>
           {/* @ts-ignore */}
            <input type="checkbox" checked={ytchecked} onChange={(e)=>{setytchecked(e.target.checked)}} ref={ytref} name="" id="" />
            <span>Youtube</span>
          </div>
          <div>
              {/* @ts-ignore */}
            <input type="checkbox" checked={csearchchecked}  onChange={(e)=>{setcsearchchecked(e.target.checked)}} ref={csref} name="" id="" />
            <span>Custom search</span>
          </div>
          <div>
              {/* @ts-ignore */}
            <input type="checkbox" checked={scholarchecked}  onChange={(e)=>{setscholarchecked(e.target.checked)}} ref={scholarref}  name="" id="" />
            <span>Scholar</span>
          </div>
        </div>
          {
          ytchecked && <div>
          <h2 className="text-center text-2xl underline ">Youtube resources</h2>
          <div className="flex gap-5 flex-wrap justify-center items-center  mt-5 px-5">
            {
              ytdataresponse.map((video:any,idx:number)=>{
                return <YtResponseCard key={idx} query={video.id.videoId}></YtResponseCard>
              })
            }
          </div>
          </div>
          }

          {
           csearchchecked && 
            <div>
                <h1 className="text-2xl text-center underline">Related articles and blogs</h1>
                  <div className="flex gap-5 justify-center items-center flex-wrap px-5 mt-3">
                    {
                      customsearchdata.map((article:object,idx:number)=>{
                        if(idx<5){
                        return <div className="flex mb-5 pt-3 h-fit md:w-5/12 p-2 items-center justify-center  flex-col gap-2 bg-slate-200">
                          <div key={idx} className="md:w-4/12 w-full gap-3 p-1   flex-row flex justify-center items-center h-fit">
                          
                          {/* @ts-ignore */}
                     {article.pagemap.metatags[0]["og:image"]!=undefined && <img src={article.pagemap.metatags[0]["og:image"]}  className="w-20 h-20" alt="image" />}
                              
                          {/* @ts-ignore */}
                          <a href={article.link} target="_blank" className="text-blue-900">{article.title}</a>
                          </div>
                            {/* @ts-ignore */}
                          <p>{article.snippet}</p>
                        </div>
                        }
                      })
                    }
                  </div>
            </div>
          }

          { 
          scholarchecked &&
          <div className="mt-2 mb-2 ">
                <h1 className="text-2xl text-center underline">Academic resources and papers</h1>
                <div className="flex gap-5 justify-center items-center flex-wrap px-5 mt-3">
                  {
                    scholardata.map((article:object,idx:number)=>{
                      if(idx<5){
                      return <div key={idx} className="md:w-4/12 p-2 w-full gap-3 bg-slate-400  flex-col flex justify-start items-center h-fit">
                        {/* @ts-ignore */}
                        <p>{article.title}</p>
                        {/* @ts-ignore */}
                        <a href={article.title_link} target="_blank" className="text-blue-900">{article.displayed_link}</a>
                        </div>
                      }
                    })
                  }
                </div>
          </div>
          }
    </div>
  )
}

export default App