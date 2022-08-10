const {knownURLS, fetchJSON} = require("./external-api-consumption/external.js");
const {Characters} = require("./rules-object/characters");
const {Episodes} = require("./rules-object/episodes");
const {Locations} = require("./rules-object/locations");
const {CharCounter} = require("./rules-object/charCounter");


function saveJSON(name,json)
{
    const fs = require("fs");
    fs.writeFileSync(`${name}.json`, json)
}

async function main()
{
    console.log("Started downloading Episode data");
    const e = await fetchJSON(knownURLS.episodes);
    console.log("Finished downloading Episode data");

    console.log("Started instantiating episodes");
    const episodes = new Episodes();
    for(let eps of e)
        episodes.addEpisode(eps);
    console.log("Finished instantiating episodes..");

    console.log("Started downloading Character data");
    const crs = await fetchJSON(knownURLS.characters)
    console.log("Finished downloading Character data");

    console.log("Started instantiating characters");
    const characters = new Characters();
    for(let char of crs)
        characters.addCharacter(char);
    console.log("Finished instantiating characters");

    console.log("Started downloading Location data");
    const ls = await fetchJSON(knownURLS.location);
    console.log("Finished downloading Location data");
    console.log("finished downloading");

    console.log("Started instantiating locations");
    const locations = new Locations();
    for(let loc of ls)
        locations.addLocation(loc);
    console.log("Finished instantiating locations");

    
    console.log("Started processing...");
    const charCounter = new CharCounter();
    saveJSON("chars",JSON.stringify(characters.characters, null, 4));
    saveJSON("locations",JSON.stringify(locations.locations, null, 4));
    saveJSON("episodes",JSON.stringify(episodes.episodes, null, 4));
    saveJSON("example",JSON.stringify(charCounter.fulfillContract(locations,episodes,characters), null, 4));
    console.log("finished");
}

(async () => {main()})()