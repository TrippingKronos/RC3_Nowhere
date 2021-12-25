/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />


import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// Calling bootstrapExtra will initiliaze all the "custom properties"
bootstrapExtra();
//Background
let backgroundNumber: number = 1;
//Foreground
let foregroundNumber: number = 1;
//Foreground speed
let foregroundSpeed: number = 100;
//Background speed
let backgroundSpeed: number = 100;

let orderedBackgroundTileIds: number[] = [];

WA.onInit().then(() => {
    backgroundNumber = 1;
    foregroundNumber = 1;
    foregroundSpeed = 100;
    backgroundSpeed = 100;
    for (let i = 2; i < 12; i++) {
        WA.room.hideLayer('Background_' + i)
    }
    for (let i = 2; i < 5; i++) {
        WA.room.hideLayer('Foreground_' + i)
    }

})


//Set previous background layer
WA.room.onEnterLayer('X Background chng visual prev').subscribe(() => {
    if (backgroundNumber == 1) {
        backgroundNumber = 12;
    }
    backgroundNumber--;
    changeTiles(getBackgroundFileURL(), 'Background');
});
//Set next background layer
WA.room.onEnterLayer('X Background chng visual next').subscribe(() => {
    if (backgroundNumber == 12) {
        backgroundNumber = 0;
    }
    backgroundNumber++;
    changeTiles(getBackgroundFileURL(), 'Background');
});
//Set previous foreground layer
WA.room.onEnterLayer('Xn Foreground chng visual prev').subscribe(() => {
    if (foregroundNumber == 1) {
        foregroundNumber = 6;
    }
    foregroundNumber--;
    changeTiles(getForegroundFileURL(), 'Foreground');
});
//Set next foreground layer
WA.room.onEnterLayer('Xn Foreground chng visual next').subscribe(() => {
    if (foregroundNumber == 5) {
        foregroundNumber = 0;
    }
    foregroundNumber++;
    changeTiles(getForegroundFileURL(), 'Foreground');
});
//Set new background layer speed 60
WA.room.onEnterLayer('Xn Background speed high').subscribe(() => {
    backgroundSpeed = 60;
    changeTiles(getBackgroundFileURL(), 'Background');
});
//Set new background layer speed 80
WA.room.onEnterLayer('Xn Background speed normal').subscribe(() => {
    backgroundSpeed = 80;
    changeTiles(getBackgroundFileURL(), 'Background');
});

//Set new background layer speed 100
WA.room.onEnterLayer('Xn Background speed low').subscribe(() => {
    backgroundSpeed = 100;
    changeTiles(getBackgroundFileURL(), 'Background');
});

//Set new foreground layer speed 60
WA.room.onEnterLayer('Xn Foreground speed high').subscribe(() => {
    foregroundSpeed = 60;
    changeTiles(getForegroundFileURL(), 'Foreground');
});

//Set new foreground layer speed 80
WA.room.onEnterLayer('Xn Foreground speed normal').subscribe(() => {
    foregroundSpeed = 80;
    changeTiles(getForegroundFileURL(), 'Foreground');
});

//Set new foreground layer speed 100
WA.room.onEnterLayer('Xn Foreground speed low').subscribe(() => {
    foregroundSpeed = 100;
    changeTiles(getForegroundFileURL(), 'Foreground');
});

//Slow turn foreground opacity to 1
WA.room.onEnterLayer('Xn Foreground opacity on').subscribe(() => {
    for (let i = 0; i < 101; i++) {
        setTimeout(() => {
            WA.room.setProperty('Foreground', 'opacity', (i * 0.01) );
        }, i * 50);
    }
});

//Slow turn foreground opacity to 0
WA.room.onEnterLayer('Xn Foreground opacity off').subscribe(() => {
            WA.room.setProperty('Foreground', 'opacity', 0  );
});

//Slow turn background opacity to 1
WA.room.onEnterLayer('Xn Background opacity on').subscribe(() => {
            WA.room.setProperty('Background', 'opacity', 1 );
});

//Slow turn background opacity to 0
WA.room.onEnterLayer('Xn Background opacity off').subscribe(() => {

            WA.room.setProperty('Background', 'opacity', 0  );

});

//Slow turn background opacity to 0
WA.room.onEnterLayer('Xn Background opacity off').subscribe(() => {
            WA.room.setProperty('Background', 'opacity', 1  );
});

//Randomize background image
WA.room.onEnterLayer('Xn Background randomize').subscribe(() => {
    randomizeAnimation();
});

function randomizeAnimation() {
    let randomTiles: number[] = orderedBackgroundTileIds.sort(() => Math.random() - 0.5);
    if (randomTiles.length == 64) {
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                let nextItem = randomTiles.pop();
                if (nextItem != undefined) {
                    WA.room.setTiles([{x: i, y: j + 1, tile: nextItem, layer: 'Background'}]);
                }
            }
        }
    }
}

function orderAnimation() {
    let copy = orderedBackgroundTileIds.slice();
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            let nextItem = copy.pop();
            if (nextItem != undefined) {
                WA.room.setTiles([{x: i, y: j + 1, tile: nextItem, layer: 'Background'}]);
            }
        }
    }
}

function getForegroundFileURL() {
    return "https://raw.githubusercontent.com/TrippingKronos/RC3_Nowhere/main/vjapp/" + 'Foreground_' + foregroundNumber + '_' + foregroundSpeed + '.json';
}

function getBackgroundFileURL() {
    return "https://raw.githubusercontent.com/TrippingKronos/RC3_Nowhere/main/vjapp/" + 'Background_' + backgroundNumber + '_' + backgroundSpeed + '.json';
}

function changeTiles(fileName: string, layerName: string) {
    WA.room.loadTileset(fileName).then((firstId) => {
        //WA.chat.sendChatMessage('nextBackground trigger 4', 'Mr Robot');
        // x
        for (let i = 1; i < 9; i++) {
            //WA.chat.sendChatMessage('nextBackground trigger 5', 'Mr Robot');
            //y
            for (let j = 0; j < 8; j++) {
                let tileId = (j * 64) + firstId + (i - 1);
                //WA.chat.sendChatMessage(String("tileId" + tileId), "Mr Robot");
                //WA.chat.sendChatMessage('i: ' + i + " j: " + j + " tileId: " + tileId, 'Mr Robot');
                WA.room.setTiles([{x: i, y: j + 1, tile: tileId, layer: layerName}]);
            }
        }
    });
}
