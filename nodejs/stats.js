const {knownURLS, fetchJSON} = require("./external-api-consumption/external.js");

function saveJSON(json)
{
    const fs = require("fs");
    fs.writeFileSync("example.json", json)
}

(
    async () => saveJSON(JSON.stringify(await fetchJSON(knownURLS.characters))
)
)()