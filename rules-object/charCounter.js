/**
 * Fulfills the Char Counter part of the challenge
 * The description of this challenge can be found on 
 * https://www.notion.so/Rick-and-Morty-Challenge-84a1b794dc09429fb3178c2a24e7c217
 */
class CharCounter
{
    constructor()
    {

    }

    /**
     * In a given hashmap it will attempt to count the frequency of a char
     * @param {*} hashmap 
     * @param {*} char 
     * @returns structure required by the challenge containing the frequency
     */
    frequency(hashmap, char = "")
    {
        if(hashmap == undefined)
            return;

        let count = 0;
        
        for(let id in hashmap)
            count += hashmap[id].characterFrequencyInName(char);

        let resource = hashmap[Object.keys(hashmap)[0]].constructor.name;
        const structure = 
        {
            char,
            count,
            resource
        }
        return structure;
    }

    /**
     * Checks the frequency of chars inside each object's name listed in the hashmaps
     * Also creates a structure as per the requirements of the challenge
     * @param {*} locations instance of Locations
     * @param {*} episodes instance of Episodes
     * @param {*} characters instance of Characters
     * @returns Requested structure by the challenge
     */
    fulfillContract(locations, episodes, characters)
    {
        let missing;
        if(!locations)
            missing = `Missing: Locations object\n`;
        if(!episodes)
            missing += `Missing: Episodes object\n`;
        if(!characters)
            missing += `Missing: Characters object`;
        
        if(missing)
            return missing;
        
        
        const { performance } = require('perf_hooks');
        const startTime = performance.now();
        const l = this.frequency(locations.locations, "l");
        const e = this.frequency(episodes.episodes, "e");
        const c = this.frequency(characters.characters, "c");
        const endTime = performance.now();

        let time = endTime - startTime;
        const timeConstraint = 3000; //3 seconds, in milliseconds
        const in_time = time < timeConstraint
        time = `${time} ms`;
        const structure = 
        {
            exercise_name: "Char counter",
            time,
            in_time,
            results: [l,e,c]
        }
        
        return structure;
    }
}

module.exports = {CharCounter};