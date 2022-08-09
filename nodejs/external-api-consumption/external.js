const urls = 
{
    characters : `https://rickandmortyapi.com/api/character`,
    episodes : `https://rickandmortyapi.com/api/episode`,
    location : `https://rickandmortyapi.com/api/location`
}

async function fetchJSON(url = null)
{
    if(!url)
        return;
    console.log(url);
    let response = await fetch(url)
    let json = await response.json();
    
    if(!json.info.next)
        return json.results;
    
    return json.results.concat(await fetchJSON(json.info.next));;
}

function saveJSON(json)
{
    const fs = require("fs");
    fs.writeFileSync("example.json", json)
}


(
    async () => saveJSON(JSON.stringify(await fetchJSON(urls.episodes))
)
)()

function factorial(num)
{
    if(num === 1)
        return num;
    
    return num * factorial(num - 1)
}