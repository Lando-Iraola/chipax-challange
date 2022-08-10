/**
 * Fulfills the Char Counter part of the challenge
 * The description of this challenge can be found on https://www.notion.so/Rick-and-Morty-Challenge-84a1b794dc09429fb3178c2a24e7c217
 */
class Location
{
    constructor(id = "", name = "", type = "", dimension = "", residents = [])
    {
        this.id = id;
        this.name = name;
        this.type = type;
        this.dimension = dimension;
        this.residents = residents;
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
 * Holds a hashmap with many Location for quick access.
 * Character holds knowledge of these ids
 */
class Locations
{
    constructor()
    {
        this.locations = {};
        
    }

    /**
     * Adds instance of Location to locations hashmap
     * @param {*} obj JSON with location data from the rick and morty API 
     */
    addLocation(obj)
    {
        let residents = obj["residents"].map(resident => 
            {
                let sp = resident.split("/");
                let rId = sp[sp.length - 1];
                return rId
            }
        );
        let l = new Location(obj["id"], obj["name"], obj["dimension"], residents);
        this.locations[obj["id"]] = l;
    }
}

module.exports = {Locations};