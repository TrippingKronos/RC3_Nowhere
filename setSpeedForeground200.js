const {Properties} = require("@workadventure/scripting-api-extra/dist");
const map = await WA.room.getTiledMap();
const mapProperties = new Properties(map.properties);
//Get  foreground tileset (0-9) and speed (100,150,200) and reset tiles
let foregroundNumber = mapProperties.getNumber('foregroundId');
let foregroundSpeed = 200;
//Redraw tiles
WA.room.setProperty('layer2', 'foregroundSpeed', foregroundSpeed);
WA.room.loadTileset("1_" + foregroundNumber + "_" + foregroundSpeed + ".json").then((firstId) => {
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