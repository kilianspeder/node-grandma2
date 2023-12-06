export function handleExecutorFaders(obj) {
    let executorFader = [];
    // console.log(obj.itemGroups[0].items[0][0].executorBlocks[0].button1)
    obj.itemGroups[0].items[0].map((executor) => {
        //console.log(JSON.stringify(executor))
        let executorToPush = {
            executorNumber: executor.i.t,
            color: executor.bdC,
            name: executor.tt.t,
            cues: executor.cues,
            executorBlocks: []
        }
        executor.executorBlocks.map((executorBlock) => {
            executorToPush.executorBlocks.push({
                button1: {
                    id: executorBlock.button1.id,
                    text: executorBlock.button1.t,
                    state: executorBlock.button1.s
                },
                button2: {
                    id: executorBlock.button2.id,
                    text: executorBlock.button2.t,
                    state: executorBlock.button2.s
                },
                button3: {
                    id: executorBlock.button3.id,
                    text: executorBlock.button3.t,
                    state: executorBlock.button3.s
                },
                fader: {
                    text: executorBlock.fader.tt,
                    value: executorBlock.fader.v,
                    valueText: executorBlock.fader.vT,
                    min: executorBlock.fader.min,
                    max: executorBlock.fader.max
                }
            })
        })
        executorFader.push(executorToPush);
    })
    return executorFader;

}
/*
const json = {
    "realtime": false, "responseType": "playbacks", "responseSubType": 2, "iPage": 1, "itemGroups": [{
        "itemsType": 2,
        "cntPages": 10000,
        "items": [[{
            "i": {"t": "1", "c": "#C0C0C0"},
            "oType": {"t": " P", "c": "#FFFFFF"},
            "oI": {"t": "1", "c": "#FFFFFF"},
            "tt": {"t": "BARS", "c": "#FFFFFF"},
            "bC": "#000000",
            "bdC": "#00FFFF",
            "cues": {"bC": "#003F3F", "items": [{"pgs": {}}]},
            "combinedItems": 1,
            "iExec": 0,
            "isRun": 0,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Flash",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#00FFFF",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#00FFFF",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#00FFFF", "tt": "Mstr", "v": 1.000, "vT": "100%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "SelFix",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#00FFFF",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }, {
            "i": {"t": "2", "c": "#C0C0C0"},
            "oType": {"t": " P", "c": "#FFFFFF"},
            "oI": {"t": "13", "c": "#FFFFFF"},
            "tt": {"t": "SSALL", "c": "#FFFFFF"},
            "bC": "#000000",
            "bdC": "#FF7F00",
            "cues": {"bC": "#3F1F00", "items": [{"pgs": {}}]},
            "combinedItems": 1,
            "iExec": 1,
            "isRun": 1,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Flash",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#FF7F00",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FF7F00",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#FF7F00", "tt": "Mstr", "v": 0.032, "vT": "03%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "SelFix",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FF7F00",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }, {
            "i": {"t": "3", "c": "#C0C0C0"},
            "oType": {"t": " P", "c": "#FFFFFF"},
            "oI": {"t": "7", "c": "#FFFFFF"},
            "tt": {"t": "shitheads", "c": "#FFFFFF"},
            "bC": "#000000",
            "bdC": "#00FF00",
            "cues": {"bC": "#003F00", "items": [{"pgs": {}}]},
            "combinedItems": 1,
            "iExec": 2,
            "isRun": 1,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Flash",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#00FF00",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#00FF00",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#00FF00", "tt": "Mstr", "v": 0.460, "vT": "46%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "SelFix",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#00FF00",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }, {
            "i": {"t": "4", "c": "#C0C0C0"},
            "oType": {"t": " P", "c": "#FFFFFF"},
            "oI": {"t": "5", "c": "#FFFFFF"},
            "tt": {"t": "Tresen", "c": "#FFFFFF"},
            "bC": "#000000",
            "bdC": "#0000FF",
            "cues": {"bC": "#00003F", "items": [{"pgs": {}}]},
            "combinedItems": 1,
            "iExec": 3,
            "isRun": 1,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Flash",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#0000FF",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#0000FF",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#0000FF", "tt": "Mstr", "v": 0.000, "vT": "00%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "SelFix",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#0000FF",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }, {
            "i": {"t": "5", "c": "#C0C0C0"},
            "oType": {"t": " P", "c": "#FFFFFF"},
            "oI": {"t": "26", "c": "#FFFFFF"},
            "tt": {"t": "PIX3L", "c": "#FFFFFF"},
            "bC": "#000000",
            "bdC": "#FF7F00",
            "cues": {"bC": "#3F1F00", "items": [{"pgs": {}}]},
            "combinedItems": 1,
            "iExec": 4,
            "isRun": 1,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Flash",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#FF7F00",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FF7F00",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#FF7F00", "tt": "Mstr", "v": 0.032, "vT": "03%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "SelFix",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FF7F00",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }], [{
            "i": {"t": "6", "c": "#C0C0C0"},
            "oType": {"t": " P", "c": "#FFFFFF"},
            "oI": {"t": "10", "c": "#FFFFFF"},
            "tt": {"t": "STRBS", "c": "#FFFFFF"},
            "bC": "#000000",
            "bdC": "#FFFFFF",
            "cues": {"bC": "#3F3F3F", "items": [{"pgs": {}}]},
            "combinedItems": 1,
            "iExec": 5,
            "isRun": 1,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Flash",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#FFFFFF",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FFFFFF",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#FFFFFF", "tt": "Mstr", "v": 0.000, "vT": "00%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "SelFix",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FFFFFF",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }, {
            "i": {"t": "7", "c": "#C0C0C0"},
            "oType": {"t": " P", "c": "#FFFFFF"},
            "oI": {"t": "29", "c": "#FFFFFF"},
            "tt": {"t": "HPBAR", "c": "#FFFFFF"},
            "bC": "#000000",
            "bdC": "#00FF7F",
            "cues": {"bC": "#003F1F", "items": [{"pgs": {}}]},
            "combinedItems": 1,
            "iExec": 6,
            "isRun": 0,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Flash",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#00FF7F",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#00FF7F",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#00FF7F", "tt": "Mstr", "v": 1.000, "vT": "100%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "SelFix",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#00FF7F",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }, {
            "i": {"t": "8", "c": "#C0C0C0"},
            "oType": {"t": " P", "c": "#FFFFFF"},
            "oI": {"t": "36", "c": "#FFFFFF"},
            "tt": {"t": "pointes", "c": "#FFFFFF"},
            "bC": "#000000",
            "bdC": "#FF0000",
            "cues": {"bC": "#3F0000", "items": [{"pgs": {}}]},
            "combinedItems": 1,
            "iExec": 7,
            "isRun": 0,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Flash",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#FF0000",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FF0000",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#FF0000", "tt": "Mstr", "v": 1.000, "vT": "100%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "SelFix",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FF0000",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }, {
            "i": {"t": "9", "c": "#FFFFFF"},
            "oType": {"t": "  ", "c": "#FFFFFF"},
            "oI": {"t": "", "c": "#FFFFFF"},
            "tt": {"t": "Grand", "c": "#FFFFFF"},
            "bC": "#E8A901",
            "bdC": "#FF007F",
            "cues": {"bC": "#3F001F", "items": [{"t": "100%", "c": "#FFFFFF", "pgs": {}}]},
            "combinedItems": 1,
            "iExec": 8,
            "isRun": 0,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFF00",
                    "bdC": "#FF007F",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Black",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FF007F",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#FF007F", "tt": "Grand", "v": 1.000, "vT": "100%", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "Empty",
                    "s": false,
                    "c": "#FFFFFF",
                    "bdC": "#FF007F",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }, {
            "i": {"t": "10", "c": "#000000"},
            "oType": {"t": "", "c": "#FFFFFF"},
            "oI": {"t": "", "c": "#FFFFFF"},
            "tt": {"t": "", "c": "#FFFFFF"},
            "bC": "#404040",
            "bdC": "#404040",
            "cues": {},
            "combinedItems": 1,
            "iExec": 9,
            "isRun": 0,
            "executorBlocks": [{
                "button1": {
                    "id": 0,
                    "t": "Empty",
                    "s": false,
                    "c": "#808080",
                    "bdC": "#404040",
                    "leftLED": {},
                    "rightLED": {}
                },
                "button2": {
                    "id": 1,
                    "t": "Empty",
                    "s": false,
                    "c": "#808080",
                    "bdC": "#404040",
                    "leftLED": {},
                    "rightLED": {}
                },
                "fader": {"bdC": "#404040", "v": 0.000, "vT": "", "min": 0.000, "max": 1.000},
                "button3": {
                    "id": 2,
                    "t": "Empty",
                    "s": false,
                    "c": "#808080",
                    "bdC": "#404040",
                    "leftLED": {},
                    "rightLED": {}
                }
            }]
        }]]
    }], "worldIndex": 0
}
*/
