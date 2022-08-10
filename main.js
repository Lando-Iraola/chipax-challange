function saveJSON(name,json)
{
    const fs = require("fs");
    fs.writeFileSync(`${name}.json`, json)
}

async function downloadData()
{
    const {knownURLS, fetchJSON, fetchCharacters} = require("./external-api-consumption/external.js");

    const downloadStartTime = performance.now();
    console.log("Started downloading Episode data");
    const epStartTime = performance.now();
    const episodesObj = await fetchJSON(knownURLS.episodes);
    const epEndTime = performance.now();
    console.log(`Finished downloading Episode data in ${(epEndTime - epStartTime) / 1000} seconds`);

    console.log("Started downloading Character data");
    const charStartTime = performance.now();
    const charactersObj = await fetchCharacters();
    const charEndTime = performance.now();
    console.log(`Finished downloading Character data in ${(charEndTime - charStartTime) / 1000} seconds`);

    console.log("Started downloading Location data");
    const locationStartTime = performance.now();
    const locationObj = await fetchJSON(knownURLS.location);
    const locationEndTime = performance.now();
    console.log(`Finished downloading Location data in ${(locationEndTime - locationStartTime) / 1000} seconds`);

    const downloadEndTime = performance.now();
    console.log(`\n\nfinished downloading in ${(downloadEndTime - downloadStartTime) / 1000} seconds\n\n`);

    return { episodesObj, charactersObj, locationObj };
}

function instantiateClasses(episodesObj, charactersObj, locationObj)
{
    const {Characters} = require("./rules-object/characters");
    const {Episodes} = require("./rules-object/episodes");
    const {Locations} = require("./rules-object/locations");

    const instantiationStartTime = performance.now();
    console.log("Started instantiating episodes");
    const epInstStartTime = performance.now();
    const episodes = new Episodes();
    for(let eps of episodesObj)
        episodes.addEpisode(eps);
    const epInstEndTime = performance.now();
    console.log(`Finished instantiating episodes in ${epInstEndTime - epInstStartTime} ms`);

    console.log("Started instantiating characters");
    const charInstStartTime = performance.now();
    const characters = new Characters();
    for(let char of charactersObj)
        characters.addCharacter(char);
    const charInstEndTime = performance.now();
    console.log(`Finished instantiating characters in ${charInstEndTime - charInstStartTime} ms`);

    console.log("Started instantiating locations");
    const locationInstStartTime = performance.now();
    const locations = new Locations();
    for(let loc of locationObj)
        locations.addLocation(loc);
    const locationInstEndTime = performance.now();
    console.log(`Finished instantiating locations ${locationInstEndTime - locationInstStartTime} in ms`);

    const instantiationEndTime = performance.now();
    console.log(`\n\nFinished instantiating everything in ${instantiationEndTime - instantiationStartTime} ms\n\n`)

    return {episodes, characters, locations}
}

async function main()
{
    const { performance } = require('perf_hooks');
    const startTime = performance.now();

    const {episodesObj, charactersObj, locationObj} = await downloadData();
    const {episodes, characters, locations} = instantiateClasses(episodesObj, charactersObj, locationObj);

    console.log("Started fulfilling Challenge requirements");
    const requirementsStartTime = performance.now();
    const {CharCounter} = require("./rules-object/charCounter");
    const charCounter = new CharCounter();
    
    const {EpisodeLocations} = require("./rules-object/episodeLocations");
    const episodeLocations = new EpisodeLocations();
    let res = 
    [
        charCounter.fulfillContract(locations,episodes,characters),
        episodeLocations.fulfillContract(locations,episodes,characters)
    ]

    saveJSON("rick and morty chipax challenge", JSON.stringify(res, null, 4));

    const requirementsEndTime = performance.now();
    console.log(`finished fulfilling Challenge requirements in ${requirementsEndTime - requirementsStartTime} ms`);

    const endTime = performance.now();

    console.log(`finished in ${(endTime - startTime) / 1000} seconds`);
}

(async () => {main()})()