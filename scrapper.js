const { fetchAZ, fetchHome, fetchManga } = require("./fetcher");
const htmlparser = require("node-html-parser");
async function getAZ() {
  const doc = await fetchAZ();
  const dom = new JSDOM(doc);
  const nodes = Array.from(
    dom.window.document.querySelector("#chart-today ul").children
  );
  const mangas = nodes.map((node) => {
    return {
      id: node.querySelector("a.manga-poster").getAttribute("href").slice(1),
      title: node.querySelector("h3.manga-name a").getAttribute("title"),
      cover: node.querySelector("img").getAttribute("src"),
    };
  });
  return mangas;
}

async function getTrending() {
  const doc = await fetchHome();
  const dom = htmlparser.parse(doc);
  const nodes = dom.querySelectorAll("#trending-home div.item");
  const mangas = nodes.map(node => {
    return {
      id: node.querySelector('.link-mask').getAttribute('href'),
      name: node.querySelector('.manga-poster-img').getAttribute('alt'),
      cover: node.querySelector('.manga-poster-img').getAttribute('src'),
    }
  })
  
  return mangas
}

async function getManga(id) {
  const doc = await fetchManga(id);
  const dom = htmlparser.parse(doc);
  const desc = dom.querySelector("div.anis-content");
  const nodes = dom.querySelectorAll('#en-chapters .chapter-item .item-link')
  var obj = {};

  const arr = desc.querySelectorAll('item item-name');
  
  //fills manga details Type,status,...
  arr.forEach(node => {
    obj[node.firstChild.innerText.toLowerCase()] = node.lastChild.innerText
  })
  


  const mangaDesc = {
    title: desc.querySelector("h2.manga-name").innerHTML,
    genres: desc.querySelectorAll('.genres a').map(node => node.innerHTML),
    description: desc.querySelector("div.description").innerHTML,
    info: obj,
  };

  //creates array of chapter objects 
  const chapters = nodes.map((node) => {
    return {
      id: node.getAttribute("href"),
      title: node.getAttribute("title"),
    };
  });

  return {
    desc: mangaDesc,
    chapters: chapters,
  };
}

module.exports = { getTrending, getAZ, getManga };
