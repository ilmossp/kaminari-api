const { fetchAZ, fetchHome, fetchManga } = require("./fetcher");
const htmlparser = require('htmlparser2')
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
  const dom = htmlparser.parseDocument(doc)

  const nodes = Array.from(
    dom.querySelector("#trending-home .swiper-wrapper").children
  );
  const mangas = nodes.map((node) => {
    return {
      id: node.querySelector("a.link-mask").getAttribute("href"),
      title: node.querySelector("img.manga-poster-img").getAttribute("alt"),
      cover: node.querySelector("img.manga-poster-img").getAttribute("src"),
    };
  });
  return mangas;
}

async function getManga(id) {
  const doc = await fetchManga(id);
  const time = new Date().getTime();
  const dom = new JSDOM(doc);
  console.log((new Date().getTime() - time) / 1000);
  const desc = dom.window.document.querySelector("div.anis-content");
  const nodes = Array.from(
    dom.window.document.querySelector("#en-chapters").children
  );
  var obj = {};

  const arr = Array.from(desc.querySelector(".anisc-info").children);
  let l = arr.length;
  for (let i = 0; i < l; ++i) {
    if ("item" in arr[i].classList) {
      continue;
    } else {
      obj[arr[i].querySelector("span.item-head").innerHTML] = arr[
        i
      ].querySelector("a")
        ? arr[i].querySelector("a").innerHTML
        : arr[i].querySelector(".item-name");
    }
  }

  const mangaDesc = {
    title: desc.querySelector("h2.manga-name").innerHTML,
    genres: Array.from(desc.querySelector(".genres").children).map(
      (node) => node.innerHTML
    ),
    description: desc.querySelector("div.description").innerHTML,
    info: obj,
  };
  const chapters = nodes.map((node) => {
    return {
      id: node.querySelector("a.item-link").getAttribute("href"),
      title: node.querySelector("a.item-link").getAttribute("title"),
      number: node.getAttribute("data-number"),
    };
  });

  return {
    desc: mangaDesc,
    chapters: chapters,
  };
}

module.exports = { getTrending, getAZ, getManga };
