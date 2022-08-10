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

(
    async () => 
    {
        console.log("Started downloading Episode data");
        const episodes = new Episodes();
        for(let eps of await fetchJSON(knownURLS.episodes))
            episodes.addEpisode(eps);
        
        console.log("Started downloading Character data");
        const characters = new Characters();
        for(let char of await fetchJSON(knownURLS.characters))
            characters.addCharacter(char);
        
        console.log("Started downloading Location data");
        const locations = new Locations();
        for(let loc of await fetchJSON(knownURLS.location))
            locations.addLocation(loc);
        
        console.log("finished downloading");
        console.log("Started processing...");
        const charCounter = new CharCounter();
        saveJSON("chars",JSON.stringify(characters.characters));
        saveJSON("locations",JSON.stringify(locations.locations));
        saveJSON("episodes",JSON.stringify(episodes.episodes));
        saveJSON("example",JSON.stringify(charCounter.fulfillContract(locations,episodes,characters)));
        console.log("finished");
    }
)()