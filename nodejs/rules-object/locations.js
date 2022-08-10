/**
 * Holds data about a location
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
 * Holds a many locations in a hashmap
 */
class Locations
{
    constructor()
    {
        this.locations = {};
        
    }

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

module.exports = {Location, Locations};