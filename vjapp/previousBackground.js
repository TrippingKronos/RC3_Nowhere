import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// Calling bootstrapExtra will initiliaze all the "custom properties"
bootstrapExtra();

WA.chat.sendChatMessage('previousBackground trigger', 'Mr Robot');

const {Properties} = require("@workadventure/scripting-api-extra/dist");
const map = await WA.room.getTiledMap();
const mapProperties = new Properties(map.properties);
//Get next forground tileset (0-9) and speed (100,150,200) and set reset tiles
let backgroundNumber = mapProperties.getNumber('backgroundId');
let backgroundSpeed = mapProperties.getNumber('backgroundSpeed');
backgroundNumber = backgroundNumber - 1;
if (backgroundNumber < 0)
{
    backgroundNumber = backgroundNumber + 10;
}
backgroundNumber = backgroundNumber % 10;
//Redraw tiles
WA.room.setProperty('layer1', 'backgroundNumber', backgroundNumber);
WA.room.loadTileset("2_" + backgroundNumber + "_" + backgroundSpeed + ".json").then((firstId) => {
    for (let i = 1; i < 9; i++) {
        for (let j= 0; i < 8; i++)
        {
            WA.room.setTiles([{x: 1, y: i, tile: (j * 64) +firstId, layer: 'Layer2'}]);
            WA.room.setTiles([{x: 2, y: i, tile: (j * 64) +firstId, layer: 'Layer2'}]);
            WA.room.setTiles([{x: 3, y: i, tile: (j * 64) +firstId, layer: 'Layer2'}]);
            WA.room.setTiles([{x: 4, y: i, tile: (j * 64) +firstId, layer: 'Layer2'}]);
            WA.room.setTiles([{x: 5, y: i, tile: (j * 64) +firstId, layer: 'Layer2'}]);
            WA.room.setTiles([{x: 6, y: i, tile: (j * 64) +firstId, layer: 'Layer2'}]);
            WA.room.setTiles([{x: 7, y: i, tile: (j * 64) +firstId, layer: 'Layer2'}]);
            WA.room.setTiles([{x: 8, y: i, tile: (j * 64) +firstId, layer: 'Layer2'}]);
        }
    }
})