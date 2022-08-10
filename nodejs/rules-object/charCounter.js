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
        let resource = hashmap[Object.keys(hashmap)[0]].constructor.name;
        for(let id in hashmap)
        {
            count += hashmap[id].characterFrequencyInName(char)
            
        }

        const structure = {
            char,
            count,
            resource
        }
        return structure;
    }

    /**
     * Checks the frequency of chars inside each object's name listed in the hashmaps
     * Also creates a structure as per the requirements of the challenge
     * @param {*} locations 
     * @param {*} episodes 
     * @param {*} characters 
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
        
        const timeConstraint = 3000; //3 seconds, in milliseconds

        const l = frequency(locations.locations, "l");
        const e = frequency(episodes.episodes, "e");
        const c = frequency(characters.characters, "c");
        
        const structure = 
        {
            exercise_name: "Char counter",
            time,
            in_time: time < timeConstraint,
            results: [l,e,c]
        }
        
        return structure;
    }
}