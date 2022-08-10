/**
 * Fulfills the Episode locations part of the challenge
 * The description of this challenge can be found on https://www.notion.so/Rick-and-Morty-Challenge-84a1b794dc09429fb3178c2a24e7c217
 */
class EpisodeLocations
{
    constructor()
    {

    }

    /**
     * Returns a list of episodes which contains a set of locations of all characters that appeared in it
     * set in this case refers to: https://en.wikipedia.org/wiki/Set_(abstract_data_type)#:~:text=In%20computer%20science%2C%20a%20set,concept%20of%20a%20finite%20set.
     * @param {*} locations instance of Locations
     * @param {*} episodes instance of Episodes
     * @param {*} characters instance of Characters
     * @returns 
     */
    fulfillContract(locations, episodes, characters)
    {
        const { performance } = require('perf_hooks');
        const startTime = performance.now();

        const results = [];
        const locs = locations.locations;
        
        for(let ep in episodes.episodes)
        {
            const episode = episodes.episodes[ep];
            const hashLocations = {};
            for(let char of episode.characters)
            {
                const character = characters.characters[char];
                if(locs[character.origin])
                    hashLocations[locs[character.origin].name] = locs[character.origin].name;
                else
                    hashLocations["unknown"] = "unknown";
                
            }

            const requested_data = 
            {
                name : episode.name,
                episode : episode.episode,
                count : Object.keys(hashLocations).length,
                locations : Object.keys(hashLocations)
            }
            
            results.push(requested_data);
        }

        const endTime = performance.now();

        let time = endTime - startTime;
        const timeConstraint = 3000; //3 seconds, in milliseconds
        const in_time = time < timeConstraint
        time = `${time} ms`;

        const structure = 
        {
            exercise_name: "Episode locations",
            time,
            in_time,
            results
        }

        return structure;
    }
}

module.exports = {EpisodeLocations};