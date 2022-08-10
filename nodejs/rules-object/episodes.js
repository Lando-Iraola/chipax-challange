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

class Episodes
{
    constructor()
    {
        this.episodes = {};   
    }

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