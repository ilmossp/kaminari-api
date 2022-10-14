const { getTrending, getManga, getFiltered, getChapter } = require("../lib/scrapper")

async function trending(req,res){
  const manga = await getTrending();
  return res.json(manga);
}

async function manga(req,res){
  const manga= await getManga(req.params.id)
  return res.json(manga)
}

async function mangas(req,res){
  const mangas= await getFiltered(req.query)
  return res.json(mangas)
}

async function chapter(req,res){
  const chapter = await getChapter(req.params)
  return res.json(chapter)
  
}


module.exports={trending,manga,mangas,chapter}