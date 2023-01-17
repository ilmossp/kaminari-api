const { fetchAZ, fetchHome, fetchManga, fetchFiltered, fetchChapters, fetchMangaID } = require("./fetcher");
const htmlparser = require("node-html-parser");


/**
 * this function is supposed to give you a list of mangas sorted from A to Z howver i havent found a use for it yet
 * 
 */
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



/**
 * 
 * parses the home page to get trending manga, it return the id, name and cover src
 * 
 */


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



async function getFiltered(params) {
  const doc = await fetchFiltered(params)
  const dom = htmlparser.parse(doc)
  const nodes = dom.querySelectorAll('.item.item-spc')
  const mangas = nodes.map((node) => {
    return {
      id: node.querySelector('a.manga-poster').getAttribute('href'),
      cover: node.querySelector('img.manga-poster-img').getAttribute('src'),
      title: node.querySelector('h3.manga-name a').innerText,
    }
  })
  return mangas

}






//get manga and manga info
async function getManga(id) {
  const doc = await fetchManga(id);
  const dom = htmlparser.parse(doc);
  const desc = dom.querySelector("div.anis-content");
  const nodes = dom.querySelectorAll('#en-chapters .chapter-item .item-link')
  var obj = {};

  const arr = desc.querySelectorAll('.anisc-info .item.item-title');
  //fills manga details Type,status,...
  arr.forEach(node => {
    console.log(obj)
    obj[node.querySelector('.item-head').innerText.toLowerCase()] = node.querySelector('a')?.innerText || node.querySelector('.name').innerText
  })



  const mangaDesc = {
    title: desc.querySelector("h2.manga-name").innerHTML,
    genres: desc.querySelectorAll('.genres a').map(node => node.innerHTML),
    synopsis: desc.querySelector("div.description").innerHTML,
    info: obj,
  };

  //creates array of chapter objects 
  const chapters = nodes.map((node) => {
    return {
      id: node.getAttribute("href").split('/').at(-1),
      title: node.getAttribute("title"),
    };
  });

  return {
    description: mangaDesc,
    chapters: chapters,
  };
}


/*

This function is used to get the chapters from the mangareader cdn,
it sends a request to the page containing the chapter reader and scraps it for the id.
The id is then used to fetch the html containgin the sources for all the chapter images.


**/

async function getChapter({ id, chapter }) {
  const doc = await fetchMangaID(id, chapter);
  const dom = htmlparser.parse(doc);
  const ID = dom.querySelector("div#wrapper").getAttribute('data-reading-id');
  const secDoc = await fetchChapters(ID);
  const secDom = htmlparser.parse(secDoc.html);
  const nodes = secDom.querySelectorAll('div.iv-card');
  const images = nodes.map((node) => {
    return {
      src: node.getAttribute('data-url')
    }
  })
  return images;

}


module.exports = { getTrending, getAZ, getManga, getFiltered, getChapter };
