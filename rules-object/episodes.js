/**
 * Fulfills the Char Counter part of the challenge
 * The description of this challenge can be found on https://www.notion.so/Rick-and-Morty-Challenge-84a1b794dc09429fb3178c2a24e7c217
 */
class Episode
{
    constructor(id = "", name = "", air_date = "", episode = "", characters = [])
    {
        this.id = id;
        this.name = name;
        this.air_date = air_date;
        this.episode = episode;
        this.characters = characters
    }

    characterFrequencyInName(character = "")
    {
        let frequency = 0;
        character = character.toLocaleLowerCase();
        const lowerCase = this.name.toLocaleLowerCase();
        for(let char in lowerCase)
        {
            if(lowerCase[char] === character)
                ++frequency;
        }

        return frequency
    }
}

/**
 * Holds a hashmap with many Episode for quick access.
 * Character holds knowledge of these ids
 */
class Episodes
{
    constructor()
    {
        this.episodes = {};   
    }

    /**
     * Adds instance of Episode to episodes hashmap
     * @param {*} obj JSON with episodes data from the rick and morty API 
     */
    addEpisode(obj)
    {
        const characters = obj["characters"].map(character => 
            {
                let sp = character.split("/");
                let cId = sp[sp.length - 1];
                return cId
            }
        );
        
        let e = new Episode(obj["id"], obj["name"], obj["air_date"], obj["episode"], characters);
        this.episodes[obj["id"]] = e;
    }
}

module.exports = {Episodes};