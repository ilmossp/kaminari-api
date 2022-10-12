const { getTrending, getManga, getFiltered } = require("../lib/scrapper")

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


module.exports={trending,manga,mangas}