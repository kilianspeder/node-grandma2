import Websocket from 'ws';
import md5 from 'md5'
import {EventEmitter} from 'events';
import {handleExecutorFaders} from "./handleExecutorFaders.js";
import {handleExecutorButtons} from "./handleExecutorButtons.js";

export class GrandMA2 {

    onExecutorFaderChanged = (executorFader) => {
    }
    onExecutorButtonsChanged = (executorButtons) => {
    }
    config = {
        username: "",
        password: "",
        numberExecutorFader: 5,
        startExecutorFader: 1,
        numberExecutorButtons: 5,
        startExecutorButton: 101,
        intervalId: null
    }

    states = {
        pages: {
            faderPage: 0,
            buttonPage: 0
        },
        request: 0,
        session: 0,
        interval_on: 0,
        prevExecutorFader: [],
        prevExecutorButtons: [],
        subscribedRequestTypes: []
    }

    constructor(ip, username, password, subscribedRequestTypes, numberExecutorFader, startExecutorFader, numberExecutorButtons, startExecutorButton) {
        //this.client = new websocket.w3cwebsocket(`ws://${ip}:80/`);
        this.client = new Websocket(`ws://${ip}:80/`);
        this.eventEmitter = new EventEmitter();
        this.config.username = username;
        this.config.password = md5(password);
        this.states.subscribedRequestTypes = subscribedRequestTypes;

        this.config.numberExecutorFader = numberExecutorFader;
        this.config.numberExecutorButtons = numberExecutorButtons;
        this.config.startExecutorButton = startExecutorButton;
        this.config.startExecutorFader = startExecutorFader;

        this.client.onmessage = (e) => {

            this.#onMessage(e);
        }

        this.client.onopen = (e) => {
            this.#onOpen(e)
        }

        this.client.onclose = () => {
            this.#onClose()
        }

        this.client.onerror = function (e) {
            console.log('GrandMA2 Connection Error');
            console.log(e)
        };

        this.client.onclose = (e) => {
            this.#onClose()
        }

        this.eventEmitter.on("executorFaderChanged", (e, ...args) => {
            this.onExecutorFaderChanged(e)
        })

        this.eventEmitter.on("executorButtonsChanged", (e, ...args) => {
            this.onExecutorButtonsChanged(e)
        })
    }

    on(eventName, listener) {
        this.eventEmitter.on(eventName, listener)
    }

    #onOpen(e) {
        console.log('GrandMA2 Client Connected');
    }

    #onClose(e) {
        clearInterval(this.config.intervalId)
        console.log('GrandMA2 Websocket Client Closed');
    }

    #onMessage(e) {

        this.states.request++;

        if (this.states.request >= 9) {
            this.client.send('{"session":' + this.states.session + '}');
            this.client.send('{"requestType":"getdata","data":"set,clear,solo,high","session":' + this.states.session + ',"maxRequests":1}'.toString());
            this.states.request = 0;
        }

        //filter messages by type
        try {


            if (typeof e.data === 'string') {
                //console.log("Received: '" + e.data + "'");
                //console.log(e.data);

                let obj = JSON.parse(e.data);
                //console.log(obj);

                if (obj.status === "server ready") {
                    //respond to server_ready and request websocket session id
                    console.log("SERVER READY");
                    this.client.send('{"session":0}'.toString())
                }
                if (obj.forceLogin === true) {
                    //when login is required, get config options, hash password and send login request
                    console.log("LOGIN ...");
                    this.states.session = (obj.session);
                    this.client.send(JSON.stringify({
                        "requestType": "login",
                        "username": this.config.username,
                        "password": this.config.password,
                        "session": this.states.session,
                        "maxRequests": 10
                    }))
                }

                if (obj.session) {
                    //if obj.session is set,
                    if (obj.session === 0) {
                        console.log("GrandMA2 CONNECTION ERROR");
                        this.client.send('{"session":' + session + '}'.toString());
                    } else if (obj.session === -1) {
                        console.log("Please turn on Web Remote, and set Web Remote password to \"remote\"");
                        //send sessionClosed event to clear and close midi and exit process
                        //this.#emitEvent('sessionClosed', "")
                    } else {
                        //save session ID
                        this.states.session = (obj.session);
                    }
                }

                if (obj.text) {
                    //if obj.text is set, log text
                    console.log(`GrandMA2 incoming text: ${obj.text}`)
                }

                if (obj.responseType === "login" && obj.result === true) {
                    //if login was successful
                    if (this.states.interval_on === 0) {
                        this.states.interval_on = 1;
                        this.config.intervalId = setInterval(this.#interval, 100);//80
                    }
                    console.log("GrandMA2: ...LOGGED");
                    console.log("GrandMA2: SESSION: " + this.states.session);
                }

                if (obj.responseType === "login" && obj.result === false) {
                    //if login failed
                    setInterval(this.#interval, 100);//80
                    console.log("...LOGIN ERROR");
                    console.log("SESSION " + this.states.session);
                }

                if (obj.responseType === "presetTypeList") {
                    //console.log("Preset Type List");
                }

                if (obj.responseType === "presetTypes") {
                    //console.log("Preset Types");
                }

                if (obj.responseType === "getdata") {
                    //console.log("Get Data");
                }


                if (obj.responseType === "playbacks") {
                    //when receiving playbacks/executor data
                    if (obj.responseSubType === 2) {//Fader

                        const executorFader = handleExecutorFaders(obj)

                        if (JSON.stringify(executorFader) !== JSON.stringify(this.states.prevExecutorFader)) {
                            this.states.prevExecutorFader = executorFader;
                            this.emitEvent("executorFaderChanged", executorFader);
                        }
                    }

                    if (obj.responseSubType === 3) {//Buttons

                        const executorButtons = handleExecutorButtons(obj)

                        if (JSON.stringify(executorButtons) !== JSON.stringify(this.states.prevExecutorButtons)) {
                            this.states.prevExecutorButtons = executorButtons;
                            this.emitEvent("executorButtonsChanged", executorButtons);
                        }

                    }
                }
            }
        } catch (e) {
            //console.log("error caught:")
            this.client.close()
            throw(e);
        }
    }

    emitEvent(event, ...args) {
        //console.log("emit event: " + event)
        this.eventEmitter.emit(event, args)
    }

    #interval = () => {
        //function that gets executed every 100ms to prevent timeout of Websocket (basically sending heartbeat requests)
        /*this.client.send(JSON.stringify({
            "requestType":"playbacks",
            "startIndex":[0],
            "itemsCount":[15],
            "pageIndex": this.states.faderPage,
            "itemsType":[2],
            "view":2,
            "execButtonViewMode":1,
            "buttonsViewMode":0,
            "session":this.states.session,
            "maxRequests":1
        }));*/

        this.states.subscribedRequestTypes.map((reqType) => {
            switch (reqType) {
                case "fader":
                    this.client.send('{"requestType":"playbacks","startIndex":[' + this.config.startExecutorFader + '],"itemsCount":[' + this.config.numberExecutorFader + '],"pageIndex":' + this.states.pages.faderPage + ',"itemsType":[2],"view":2,"execButtonViewMode":1,"buttonsViewMode":0,"session":' + this.states.session + ',"maxRequests":1}')
                    break;
                case "button":
                    this.client.send('{"requestType":"playbacks","startIndex":[' + this.config.startExecutorButton + '],"itemsCount":[' + this.config.numberExecutorButtons + '],"pageIndex":' + this.states.pages.buttonPage + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + this.states.session + ',"maxRequests":1}')
                    break;
            }
        })


    }

    increasePage(type) {
        if (type === "faderPage" || type === "buttonPage") {
            this.states.pages[type]++
            this.client.send(JSON.stringify({
                "requestType": "command",
                "command": `${type} +1`,
                "session": this.states.session,
                "maxRequests": 0
            }))
        }
    }

    decreasePage(type) {
        if ((type === "faderPage" || type === "buttonPage") && this.states.pages[type] > 0) {
            this.states.pages[type]--;
            this.client.send(JSON.stringify({
                "requestType": "command",
                "command": `${type} -1`,
                "session": this.states.session,
                "maxRequests": 0
            }))
        }
    }

    setPage(type, pageNumber) {
        if (type === "faderPage" || type === "buttonPage") {
            this.states.pages[type] = pageNumber;
            this.client.send(JSON.stringify({
                "requestType": "command",
                "command": `${type} ${pageNumber + 1}`,
                "session": this.states.session,
                "maxRequests": 0
            }))
        }
    }

    sendCommand(command) {
            this.client.send(JSON.stringify({
                "requestType": "command",
                "command": `${command}`,
                "session": this.states.session,
                "maxRequests": 0
            }))
    }

    setExecButtonState(executorNumber, buttonId, state){
        /*
            executorNumber: Integer; executor number (not 0 indexed)
            buttonId: Integer (0,1,2); passed with executor object in ExecutorBlocks
            state: Boolean
         */
        const execType = (executorNumber <= 100 ? "faderPage" : "buttonPage")
        this.client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + (executorNumber - 1) + ',"pageIndex":' + this.states.pages[execType] + ',"buttonId":' + buttonId + ',"pressed":' + state +',"released":' + !state + ',"type":0,"session":' + this.states.session + ',"maxRequests":0}'.toString())
    }

    setExecFaderValue(executorNumber, value){
        /*
            executorNumber: Integer; executor number (not 0 indexed)
            buttonId: Integer (0,1,2); passed with executor object in ExecutorBlocks
            value: Integer between 0 and 1
         */
        const execType = (executorNumber <= 100 ? "faderPage" : "buttonPage")

        this.client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + (executorNumber - 1) + ',"pageIndex":' + this.states.pages[execType] + ',"faderValue":' + value + ',"type":1,"session":' + this.states.session + ',"maxRequests":0}'.toString());

    }

}

