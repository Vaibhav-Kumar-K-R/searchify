function CustomSearchCard() {
  return (
    <div  className="md:w-4/12 w-full gap-3 bg-slate-200  flex-row flex justify-start items-center h-fit">
    {/* @ts-ignore */}
    <img src={article.pagemap.metatags[0]["og:image"]}  className="w-20 h-20" alt="image" />
    {/* @ts-ignore */}
     <a href={article.link} target="_blank" className="text-blue-900">{article.title}</a>
     </div>
  )
}

export default CustomSearchCard