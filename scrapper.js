const { fetchAZ, fetchHome, fetchManga} = require("./fetcher")
const jsdom = require("jsdom");
const { JSDOM } = jsdom

async function getAZ(){
    const doc = await fetchAZ()
    const dom = new JSDOM(doc)
    const  nodes =  Array.from( dom.window.document.querySelector("#chart-today ul").children)
    const mangas= nodes.map(node => {
        return {
            id: node.querySelector('a.manga-poster').getAttribute('href').slice(1),
            title: node.querySelector('h3.manga-name a').getAttribute('title'),
            cover: node.querySelector('img').getAttribute('src')
        }
    })
    return mangas
    
}

async function getTrending(){
    const doc = await fetchHome()
    const dom = new JSDOM(doc)
    const nodes = Array.from(dom.window.document.querySelector('#trending-home .swiper-wrapper').children)
    const mangas = nodes.map(node => {
        return {
            id: node.querySelector('a.link-mask').getAttribute('href'),
            title: node.querySelector('img.manga-poster-img').getAttribute('alt'),
            cover:  node.querySelector('img.manga-poster-img').getAttribute('src')
        }
    })
    return mangas
}

async function getManga(id){
    const doc =await fetchManga(id)
    const dom = new JSDOM(doc)
    const desc = dom.window.document.querySelector('div.anis-content')
    const nodes = Array.from(dom.window.document.querySelector('#en-chapters').children)
    const mangaDesc = {
        title: desc.querySelector('h2.manga-name'),
        genres: Array.from(desc.querySelector('div.genres').children).map(node => {
            node.innerHTML
        }),
        description:desc.querySelector('div.description').innerHTML,
        info: Array.from(desc.querySelector('div.anisc-info').children).map(node => {
            const obj={}
            obj[node.querySelector('span.item-head').innerHTML] = node.querySelector('a').innerText ? node.querySelector('a').innerText : node.querySelector('span.name').innerHTML  
            return obj
        }),
    }
    const chapters = nodes.map(node => {
        return {
            id: node.querySelector('a.item-link').getAttribute('href'),
            title: node.querySelector('a.item-link').getAttribute('title'),
            number: node.getAttribute('data-number')
        }
    })

    return {
        description: mangaDesc,
        chapters: chapters
    }

}

module.exports={getTrending,getAZ,getManga}