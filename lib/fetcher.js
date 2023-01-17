const axios = require('axios').default

axios.defaults.baseURL = "https://mangareader.to"

async function fetchAZ() {
    const { data } = await axios.get('/az-list')
    return data
}

async function fetchFiltered(params) {
    if (params.genres) {
        params.genres = params.genres.join(",")
    }
    try {
        const { data } = await axios.get('/filter', { params: params })
        return data
    }
    catch (e) {
        console.log(e)
    }
}


async function fetchManga(id) {
    try {
        const { data } = await axios.get(`/${id}`)
        return data
    }
    catch (e) {
        console.log(e)
    }
}


async function fetchMangaID(mangaid, chapterid) {
    try {
        const { data } = await axios.get(`/read/${mangaid}/en/chapter-${chapterid}`);
        return data
    } catch (e) {
        console.log(e);
    }

}

async function fetchChapters(mangaID) {
    try {
        const { data } = await axios.get(`/ajax/image/list/chap/${mangaID}`)
        return data
    }
    catch (e) {
        console.log(e)
    }

}

async function fetchHome() {
    try {
        const { data } = await axios.get('/home')
        return data
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = { fetchAZ, fetchHome, fetchManga, fetchFiltered, fetchMangaID, fetchChapters }