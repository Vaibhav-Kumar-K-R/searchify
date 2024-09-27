function YtResponseCard({query}:{query:StaticRange}) {
    const url=`https://www.youtube.com/embed/${query}`
  return (
    <div>
        <iframe  src={url} className='md:w-60 w-fit md:h-40' ></iframe>
    </div>
  )
}

export default YtResponseCard