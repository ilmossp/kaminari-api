const axios = require('axios').default

axios.defaults.baseURL = "https://mangareader.to"

async function fetchAZ(){
    const {data} =  await axios.get('/az-list')
    return data
}
async function fetchFiltered(params){
    const data= await axios.get(`/filter${params}`)
}

async function fetchManga(id){
    const {data} = await axios.get(`/${id}`)
    return data
}

async function fetchHome(){
    const {data} = await axios.get('/home')
    return data
}

module.exports={fetchAZ,fetchHome,fetchManga}