import {GrandMA2} from "./index.js";
const grandMa = new GrandMA2("10.1.1.1", "remote", "remote", ["button"])

grandMa.on("test", (e) => {
    console.log("test event listened")
})

grandMa.onExecutorFaderChanged = (exec) => {
    console.log(JSON.stringify(exec))
}

grandMa.on("executorFaderChanged", (e) => {
    console.log(JSON.stringify(e))
})

grandMa.on("executorButtonsChanged", (e) => {
    console.log(JSON.stringify(e))
})

let act = 1
setInterval(() => {
    if(act > 0){
        grandMa.increasePage("faderPage")
        act--
    } else {
        grandMa.decreasePage("faderPage")
        act++
    }
},1000)
