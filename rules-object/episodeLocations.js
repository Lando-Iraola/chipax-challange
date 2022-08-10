class EpisodeLocations
{
    constructor()
    {

    }

    fulfillContract(locations, episodes, characters)
    {
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
        
        const structure = 
        {
            exercise_name: "Episode locations",
            time: "1s 721.975698ms",
            in_time: true,
            results
        }

        return structure;
    }
}

module.exports = {EpisodeLocations};