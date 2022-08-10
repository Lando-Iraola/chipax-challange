/**
 * All known endpoints
 */
const knownURLS = 
{
    characters : `https://rickandmortyapi.com/api/character`,
    episodes : `https://rickandmortyapi.com/api/episode`,
    location : `https://rickandmortyapi.com/api/location`
}

/**
 * Returns all the data of the targeted API,
 * Expects the presence of results and info in the response
 * @param {*} url one of the corresponding urls within the object knownURLS
 * @returns concatenated results section from the API response
 */
async function fetchJSON(url = null)
{
    if(!url)
        return;
    
    let response = await fetch(url)
    let firstPage = await response.json();
    
    const promises = [];
    for(let i = 2; i <= firstPage.info.pages; i++)
    {
        const pageUrl = `${url}?page=${i}`;
        promises.push(fetch(pageUrl));
    }

    const remainerPages = await Promise.allSettled(promises);
    let results = firstPage.results;

    for(let result of remainerPages)
    {
        const r = await result.value;
        const nThPage = await r.json();
        results = results.concat(nThPage.results);
    }

    return results;
}

module.exports = 
{
    knownURLS,
    fetchJSON
}