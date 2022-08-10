function saveJSON(name,json)
{
    const fs = require("fs");
    fs.writeFileSync(`${name}.json`, json)
}

/**
 * Extracted method for clarity.
 * Download API data and prints to the console
 * @returns obj with all 3 known endpoints data
 */
async function downloadData()
{
    const {knownURLS, fetchJSON} = require("./external-api-consumption/external.js");

    const downloadStartTime = performance.now();
    const cyan = `\x1b[36m%s`;
    console.log(cyan, "Started downloading data");
    
    let episodesObj = fetchJSON(knownURLS.episodes);
    let charactersObj = fetchJSON(knownURLS.characters);
    let locationObj = fetchJSON(knownURLS.location);
    
    const [e, c, l] = await Promise.allSettled([episodesObj, charactersObj, locationObj]);

    episodesObj = e.value;
    charactersObj = c.value;
    locationObj = l.value;
    
    const downloadEndTime = performance.now();
    const endColor = `\x1b[0m`;
    console.log(`finished downloading in ${(downloadEndTime - downloadStartTime) / 1000} seconds`, endColor);

    return { episodesObj, charactersObj, locationObj };
}

/**
 * Extracted method for clarity
 * Instantiates Characters, Episodes and Locations
 * prints to the console
 * @param {*} episodesObj results section from episodes API
 * @param {*} charactersObj results section from character API
 * @param {*} locationObj results section from location API
 * @returns Obj that contains the instantiated things
 */
function instantiateClasses(episodesObj, charactersObj, locationObj)
{
    const {Characters} = require("./rules-object/characters");
    const {Episodes} = require("./rules-object/episodes");
    const {Locations} = require("./rules-object/locations");

    const instantiationStartTime = performance.now();
    console.log("Started instantiating Classes");
    
    const episodes = new Episodes();
    for(let eps of episodesObj)
        episodes.addEpisode(eps);
    
    const characters = new Characters();
    for(let char of charactersObj)
        characters.addCharacter(char);

    const locations = new Locations();
    for(let loc of locationObj)
        locations.addLocation(loc);
    
    const instantiationEndTime = performance.now();
    console.log(`Finished instantiating Classes in ${instantiationEndTime - instantiationStartTime} ms`)

    return {episodes, characters, locations}
}

/**
 * Executes in order to fulfill the requirements listed on the challenge
 * Results in the creation of a JSON file in the execution folder
 */
async function main()
{
    const { performance } = require('perf_hooks');
    const startTime = performance.now();

    const {episodesObj, charactersObj, locationObj} = await downloadData();
    const {episodes, characters, locations} = instantiateClasses(episodesObj, charactersObj, locationObj);

    const cyan = `\x1b[36m%s`;
    console.log(cyan, "Started fulfilling Challenge requirements");
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

    const green = `\x1b[32m%s`;
    const endColor = `\x1b[0m`;
    console.log(green, `finished in ${(endTime - startTime) / 1000} seconds`, endColor);
}

(async () => {main()})()