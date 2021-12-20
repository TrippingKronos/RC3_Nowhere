/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />


import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// Calling bootstrapExtra will initiliaze all the "custom properties"
bootstrapExtra();
//Layer1
let backgroundNumber: number;
//Layer2
let foregroundNumber: number;
//Layer2 speed
let foregroundSpeed: number;
WA.onInit().then(() => {
    backgroundNumber = 1;
    foregroundNumber = 1;
})

function getFileName() {
    return "https://raw.githubusercontent.com/TrippingKronos/RC3_Nowhere/main/vjapp/" + foregroundNumber + '_' + backgroundNumber + '_' + foregroundSpeed + '.json'; 
}

//Set previous background layer
WA.room.onEnterLayer('X Layer1 chng visual prev').subscribe(() => {
    if (backgroundNumber == 1)
    {
        backgroundNumber = 10;
    }
    backgroundNumber--;
    changeTiles(getFileName(), 'Layer1');
});
//Set next background layer
WA.room.onEnterLayer('X Layer1 chng visual next').subscribe(() => {
    if (backgroundNumber == 9)
    {
        backgroundNumber = 0;
    }
    backgroundNumber++;
    changeTiles(getFileName(), 'Layer1');
});
//Set previous foreground layer
WA.room.onEnterLayer('Xn Layer2 chng visual prev').subscribe(() => {
    if (foregroundNumber == 1)
    {
        foregroundNumber = 10;
    }
    foregroundNumber--;
    changeTiles(getFileName(), 'Layer2');
});
//Set next foreground layer
WA.room.onEnterLayer('Xn Layer2 chng visual next').subscribe(() => {
    if (foregroundNumber == 9)
    {
        foregroundNumber = 0;
    }
    foregroundNumber++;
    changeTiles(getFileName(), 'Layer2');
});
//Set new foreground layer speed 100
WA.room.onEnterLayer('Xn Layer1 speed high').subscribe(() => {
    foregroundSpeed = 100;
    changeTiles(getFileName(), 'Layer2');
});
//Set new foreground layer speed 125
WA.room.onEnterLayer('Xn Layer1 speed normal').subscribe(() => {
    foregroundSpeed = 125;
    changeTiles(getFileName(), 'Layer2');
});
//Set new foreground layer speed 150
WA.room.onEnterLayer('Xn Layer1 speed low').subscribe(() => {
    foregroundSpeed = 150;
    changeTiles(getFileName(), 'Layer2');
});

function changeTiles(fileName: string, layerName: string)
{
    WA.room.loadTileset(fileName).then((firstId) => {
        //WA.chat.sendChatMessage('nextBackground trigger 4', 'Mr Robot');
        // x
        for (let i = 1; i < 9; i++) {
            //WA.chat.sendChatMessage('nextBackground trigger 5', 'Mr Robot');
            //y
            for (let j = 0; j < 8; j++) {
                let tileId = (j * 64) + firstId + (i-1);
                //WA.chat.sendChatMessage(String("tileId" + tileId), "Mr Robot");
                //WA.chat.sendChatMessage('i: ' + i + " j: " + j + " tileId: " + tileId, 'Mr Robot');
                WA.room.setTiles([{x: i, y: j+1, tile: tileId, layer: layerName}]);
            }
        }
    });
}
