export function handleExecutorButtons(obj) {
    let executorButtons = [];
     //console.log(JSON.stringify(obj))
    obj.itemGroups[0].items.map((items) => {
        //console.log(JSON.stringify(items))
       items.map((executor) => {
            //console.log(JSON.stringify(executor))
            let executorToPush = {
                executorNumber: executor.i.t,
                color: executor.bdC,
                name: executor.tt.t,
                combinedItems: executor.combinedItems,
                isRun: executor.isRun,
                executorBlocks: [],
                empty: false,
                cues: executor.cues
            }
            //console.log(executor.bottomButtons)
           if( executor.bottomButtons) {
               executor.bottomButtons.items.map((bottomButton) => {
                   executorToPush.executorBlocks.push({
                       button1: {
                           id: 0,
                           text: bottomButton.n.t,
                           color: bottomButton.n.c
                       },
                       fader: {
                           value: bottomButton.fader.v,
                           bC: bottomButton.fader.bC
                       }
                   })
               })
           } else {
               executorToPush.empty = true;
           }
            executorButtons.push(executorToPush);
        })
    })
    return executorButtons;
}
