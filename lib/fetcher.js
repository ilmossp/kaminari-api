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
    const { data } = await axios.get('/filter', { params: params })
    return data
}


async function fetchManga(id) {
    const { data } = await axios.get(`/${id}`)
    return data
}


async function fetchMangaID(mangaid, chapterid) {
    try {
        const { data } = await axios.get(`/read/${mangaid}/en/chapter-${chapterid}`);
        return data
    } catch (e) {
        return e
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
    const { data } = await axios.get('/home')
    return data
}

module.exports = { fetchAZ, fetchHome, fetchManga, fetchFiltered, fetchMangaID, fetchChapters }