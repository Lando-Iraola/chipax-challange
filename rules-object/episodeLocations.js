class EpisodeLocations
{
    constructor()
    {

    }

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