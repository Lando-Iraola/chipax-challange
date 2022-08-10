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
 * @returns 
 */
async function fetchJSON(url = null)
{
    if(!url)
        return;
    
    let response = await fetch(url)
    let json = await response.json();
    
    if(!json.info.next)
        return json.results;
    
    return json.results.concat(await fetchJSON(json.info.next));;
}

module.exports = 
{
    knownURLS,
    fetchJSON
}