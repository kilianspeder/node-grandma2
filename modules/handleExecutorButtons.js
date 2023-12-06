export function handleExecutorButtons (obj) {
    let executorButtons = [];
    // console.log(obj.itemGroups[0].items[0][0].executorBlocks[0].button1)
    obj.itemGroups[0].items[0].map((executor) => {
        //console.log(JSON.stringify(executor))
        let executorToPush = {
            executorNumber: executor.i.t,
            color: executor.bdC,
            name: executor.tt.t,
            combinedItems: executor.combinedItems,
            isRun: executor.isRun,
            executorBlocks: []
        }
        executor.bottomButtons.items.map((bottomButtton) => {
            executorToPush.executorBlocks.push({
                button1: {
                    text: bottomButtton.n.t,
                    color: bottomButtton.n.c
                },
                fader: {
                    value: bottomButtton.fader.v,
                    bC: bottomButtton.fader.bC
                }
            })
        })
        executorButtons.push(executorToPush);
    })
    return executorButtons;
}
/*

const json = {
    "realtime": false,
    "responseType": "playbacks",
    "responseSubType": 3,
    "iPage": 1,
    "itemGroups": [
    {
        "itemsType": 3,
        "iExecOff": 100,
        "cntPages": 10000,
        "items": [
            [
                {
                    "i": {
                        "t": "101",
                        "c": "#C0C0C0"
                    },
                    "oType": {
                        "t": "  LAS",
                        "c": "#FFFFFF"
                    },
                    "oI": {
                        "t": "18",
                        "c": "#FFFFFF"
                    },
                    "tt": {
                        "t": "vorzurck",
                        "c": "#FFFFFF"
                    },
                    "bC": "#000000",
                    "bdC": "#FF7F00",
                    "cues": {
                        "bC": "#3F1F00",
                        "items": [
                            {
                                "t": "55.9 BPM",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 0.248,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "t": "0.0 s",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 1,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "pgs": {
                                    "bC": "#808080"
                                }
                            }
                        ]
                    },
                    "combinedItems": 1,
                    "iExec": 100,
                    "isRun": 0,
                    "bottomButtons": {
                        "items": [
                            {
                                "fader": {
                                    "v": 1,
                                    "bC": "#808000"
                                },
                                "n": {
                                    "t": "Toggle",
                                    "c": "#C0C0C0"
                                }
                            }
                        ]
                    }
                },
                {
                    "i": {
                        "t": "102",
                        "c": "#C0C0C0"
                    },
                    "oType": {
                        "t": "  LAS",
                        "c": "#FFFFFF"
                    },
                    "oI": {
                        "t": "24",
                        "c": "#FFFFFF"
                    },
                    "tt": {
                        "t": "SS FL",
                        "c": "#FFFFFF"
                    },
                    "bC": "#000000",
                    "bdC": "#FF7F00",
                    "cues": {
                        "bC": "#3F1F00",
                        "items": [
                            {
                                "t": "55.9 BPM",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 0.248,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "t": "0.0 s",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 1,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "pgs": {
                                    "bC": "#808080"
                                }
                            }
                        ]
                    },
                    "combinedItems": 1,
                    "iExec": 101,
                    "isRun": 0,
                    "bottomButtons": {
                        "items": [
                            {
                                "fader": {
                                    "v": 1,
                                    "bC": "#808000"
                                },
                                "n": {
                                    "t": "Toggle",
                                    "c": "#C0C0C0"
                                }
                            }
                        ]
                    }
                },
                {
                    "i": {
                        "t": "103",
                        "c": "#C0C0C0"
                    },
                    "oType": {
                        "t": "  LAS",
                        "c": "#FFFFFF"
                    },
                    "oI": {
                        "t": "36",
                        "c": "#FFFFFF"
                    },
                    "tt": {
                        "t": "circle",
                        "c": "#FFFFFF"
                    },
                    "bC": "#000000",
                    "bdC": "#00FFFF",
                    "cues": {
                        "bC": "#003F3F",
                        "items": [
                            {
                                "t": "55.9 BPM",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 0.248,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "t": "0.0 s",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 1,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "pgs": {
                                    "bC": "#808080"
                                }
                            }
                        ]
                    },
                    "combinedItems": 1,
                    "iExec": 102,
                    "isRun": 0,
                    "bottomButtons": {
                        "items": [
                            {
                                "fader": {
                                    "v": 1,
                                    "bC": "#808000"
                                },
                                "n": {
                                    "t": "Toggle",
                                    "c": "#C0C0C0"
                                }
                            }
                        ]
                    }
                },
                {
                    "i": {
                        "t": "104",
                        "c": "#C0C0C0"
                    },
                    "oType": {
                        "t": "  LAS",
                        "c": "#FFFFFF"
                    },
                    "oI": {
                        "t": "4",
                        "c": "#FFFFFF"
                    },
                    "tt": {
                        "t": "3er",
                        "c": "#FFFFFF"
                    },
                    "bC": "#000000",
                    "bdC": "#00FFFF",
                    "cues": {
                        "bC": "#003F3F",
                        "items": [
                            {
                                "t": "55.9 BPM",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 0.248,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "t": "0.0 s",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 1,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "pgs": {
                                    "bC": "#808080"
                                }
                            }
                        ]
                    },
                    "combinedItems": 1,
                    "iExec": 103,
                    "isRun": 0,
                    "bottomButtons": {
                        "items": [
                            {
                                "fader": {
                                    "v": 1,
                                    "bC": "#808000"
                                },
                                "n": {
                                    "t": "Toggle",
                                    "c": "#C0C0C0"
                                }
                            }
                        ]
                    }
                },
                {
                    "i": {
                        "t": "105",
                        "c": "#C0C0C0"
                    },
                    "oType": {
                        "t": "  LAS",
                        "c": "#FFFFFF"
                    },
                    "oI": {
                        "t": "51",
                        "c": "#FFFFFF"
                    },
                    "tt": {
                        "t": "TR SPARKLE",
                        "c": "#FFFFFF"
                    },
                    "bC": "#000000",
                    "bdC": "#0000FF",
                    "cues": {
                        "bC": "#00003F",
                        "items": [
                            {
                                "t": "55.9 BPM",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 0.248,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "t": "0.0 s",
                                "c": "#FFFFFF",
                                "pgs": {
                                    "v": 1,
                                    "bC": "#808080"
                                }
                            },
                            {
                                "pgs": {
                                    "bC": "#808080"
                                }
                            }
                        ]
                    },
                    "combinedItems": 1,
                    "iExec": 104,
                    "isRun": 0,
                    "bottomButtons": {
                        "items": [
                            {
                                "fader": {
                                    "v": 1,
                                    "bC": "#808000"
                                },
                                "n": {
                                    "t": "Toggle",
                                    "c": "#C0C0C0"
                                }
                            }
                        ]
                    }
                }
            ]
        ]
    }
],
    "worldIndex": 0
}
*/
