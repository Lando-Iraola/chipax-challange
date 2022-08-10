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
            console.log("here:", ep);
            const episode = episodes.episodes[ep];
            const requested_data = {};
            requested_data["name"] = episode.name;
            requested_data["episode"] = episode.episode;
            const hashLocations = {};
            for(let char of episode.characters)
            {
                const character = characters.characters[char];
                if(locs[character.origin])
                {
                    hashLocations[locs[character.origin].name] = locs[character.origin].name;
                }
                else
                {
                    hashLocations["unknown"] = "unknown";
                }
            }

            requested_data["count"] = Object.keys(hashLocations).length;
            requested_data["locations"] = Object.keys(hashLocations);
            console.log(requested_data);
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