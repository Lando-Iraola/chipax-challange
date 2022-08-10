class Character
{
    constructor(id = "", name = "", status = "", species = "", gender = "", origin = "", location = "", episode = [])
    {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.episode = episode;
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

class Characters
{
    constructor()
    {
        this.characters = {};   
    }

    addCharacter(obj)
    {
        const episodes = obj["episode"].map(episode => 
            {
                let sp = episode.split("/");
                let eId = sp[sp.length - 1];
                return eId
            }
        );

        let origin = obj["origin"].url.split("/");
        origin = origin[origin.length - 1];
            
        let location = obj["location"].url.split("/");
        location = location[location.length - 1];
        
        let c = new Character(obj["id"], obj["name"], obj["status"], obj["species"], obj["gender"], origin, location, episodes);
        this.characters[obj["id"]] = c;
    }
}

module.exports = {Characters};