export function handleExecutorFaders(obj) {
    let executorFader = [];
    // console.log(obj.itemGroups[0].items[0][0].executorBlocks[0].button1)
    obj.itemGroups[0].items.map((items) => {
        items.map((executor) => {
            //console.log(JSON.stringify(executor))
            let executorToPush = {
                executorNumber: executor.i.t,
                color: executor.bdC,
                name: executor.tt.t,
                cues: executor.cues,
                combinedItems: executor.combinedItems,
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
    })
    return executorFader;

}

