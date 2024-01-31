# grandMA2

A node module to interact with the grandMA2 websocket

**very work in progress**

## short WIP documentation:

initialize object:

`const grandMA2 = new GrandMA2(ipAddress, username, password, subscribedRequestTypes[], numberExecutorFader, startExecutorFader, numberExecutorButtons, startExecutorButton)`

Arguments:

|        Argument        |                                           Meaning/Type                                           |
|:----------------------:|:------------------------------------------------------------------------------------------------:|
|           IP           |                              String: IP Address of GrandMA2 Station                              |
|        username        |                             String: Username of user to log in with                              |
|        password        |                             String: Password of user to log in with                              |
| subscribedRequestTypes | Array of Strings: Request types to be subscribed; currently available: **"fader"**, **"button"** |
|  numberExecutorFader   |                          Integer: count of Executor Faders to subscribe                          |
|   startExecutorFader   |                            Integer: first Executor Fader to subscribe                            |
| numberExecutorButtons  |                         Integer: count of Executor Buttons to subscribe                          |
|  startExecutorButton   |                           Integer: first Executor Button to subscribe                            |

When an executor fader or button changes, an event is emitted (respecively `executorButtonsChanged` or `executorFaderChanged`). Listeners to these events can be added using `grandMA2.on(eventName, listener)`
Alternatively you can also use `grandMa2.onExecutorFaderChanged = (e) => {}` or `grandMa2.onExecutorButtonsChanged = (e) => {}`
The event passes an array of executor objects of the following format: TODO


`increasePage(type)`, `decreasePage(type)` accept `faderPage` or `buttonPage` as `type`;
and `setpage(type, pageNumber)` accept `faderPage` or `buttonPage` as `type` and Integer as pageNumber;
All these methods change the currently open page on grandMA2 and the queried page.

MA2 commands can be executed via `grandMa2.sendCommand(command)`,

Fader values can be set via `grandMa2.setExecFaderValue(executorNumber, value)` with `executorNumber` being the 
not-zero-indexed executor number as passed by the events and shown in grandMa2 software and`value` the desired value between 0 and 1

Button states can be set via `grandMa2.setExecButtonState(executorNumber, buttonId, value)` with `executorNumber` being 
the not-zero-indexed executor number as passed by the events and shown in grandMa2 software, `buttonId` being the id of 
the exect button you want to change (passed by event, is either 0, 1 or 2 (from bottom to top on console)) and
`value` the desired value between 0 and 1
