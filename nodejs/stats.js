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
    const { performance } = require('perf_hooks');
    const startTime = performance.now();

    const downloadStartTime = performance.now();
    console.log("Started downloading Episode data");
    const epStartTime = performance.now();
    const e = await fetchJSON(knownURLS.episodes);
    const epEndTime = performance.now();
    console.log(`Finished downloading Episode data in ${(epEndTime - epStartTime) / 1000} seconds`);

    console.log("Started downloading Character data");
    const charStartTime = performance.now();
    const crs = await fetchJSON(knownURLS.characters)
    const charEndTime = performance.now();
    console.log(`Finished downloading Character data in ${(charEndTime - charStartTime) / 1000} seconds`);

    console.log("Started downloading Location data");
    const locationStartTime = performance.now();
    const ls = await fetchJSON(knownURLS.location);
    const locationEndTime = performance.now();
    console.log(`Finished downloading Location data in ${(locationEndTime - locationStartTime) / 1000} seconds`);

    const downloadEndTime = performance.now();
    console.log(`\n\n\n\nfinished downloading in ${(downloadEndTime - downloadStartTime) / 1000} seconds\n\n\n`);

    const instantiationStartTime = performance.now();
    console.log("Started instantiating episodes");
    const epInstStartTime = performance.now();
    const episodes = new Episodes();
    for(let eps of e)
        episodes.addEpisode(eps);
    const epInstEndTime = performance.now();
    console.log(`Finished instantiating episodes in ${epInstEndTime - epInstStartTime} ms`);

    console.log("Started instantiating characters");
    const charInstStartTime = performance.now();
    const characters = new Characters();
    for(let char of crs)
        characters.addCharacter(char);
    const charInstEndTime = performance.now();
    console.log(`Finished instantiating characters in ${charInstEndTime - charInstStartTime} ms`);

    console.log("Started instantiating locations");
    const locationInstStartTime = performance.now();
    const locations = new Locations();
    for(let loc of ls)
        locations.addLocation(loc);
    const locationInstEndTime = performance.now();
    console.log(`Finished instantiating locations ${locationInstEndTime - locationInstStartTime} in ms`);

    const instantiationEndTime = performance.now();
    console.log(`Finished instantiating everything in ${instantiationEndTime - instantiationStartTime} ms`)

    
    console.log("Started processing...");
    const charCounter = new CharCounter();
    saveJSON("chars",JSON.stringify(characters.characters, null, 4));
    saveJSON("locations",JSON.stringify(locations.locations, null, 4));
    saveJSON("episodes",JSON.stringify(episodes.episodes, null, 4));
    saveJSON("example",JSON.stringify(charCounter.fulfillContract(locations,episodes,characters), null, 4));

    const endTime = performance.now();

    console.log(`finished in ${(endTime - startTime) / 1000} seconds`);
}

(async () => {main()})()