// "use strict";
class Logger {
    // Log levels as per https://tools.ietf.org/html/rfc5424
    static get ERROR() {
        return 3;
    }
    static get WARN() {
        return 4;
    }
    static get INFO() {
        return 6;
    }
    static get DEBUG() {
        return 7;
    }

    constructor(options) {
        if (!options || typeof options !== "object") {
            throw new Error("options are required, and must be an object");
        }

        if (!options.url) {
            throw new Error("options must include a url property");
        }

        this.url = options.url;
        this.headers = options.headers || [
            { "Content-Type": "application/json" },
        ];
        this.level = options.level || Logger.ERROR;
        this.batch_size = options.batch_size || 10;
        this.messages = [];
    }
    send(message) {
        //TODO add axios save to server
        // console.log("TODO send to server", message);
        try {
            var _LTracker = window._LTracker || [];
            _LTracker.push({
                logglyKey: process.env.REACT_APP_API_LOGGLY_KEY,
                sendConsoleErrors: true,
                tag: "backoffice-logs",
            });
            //console.log("logiraj nešto");
            _LTracker.push({
                appName: "web",
                page: "live",
                data: { ...message },
                context: navigator.userAgent,
                level: message.level,
            });
        } catch (error) {
            //
        }

        try {
            const anotherEvent = new CustomEvent("logger", {
                detail: { ...message },
            });
            document.dispatchEvent(anotherEvent);
        } catch (e) {
            //
        }

        // // // var xhr = new XMLHttpRequest();
        // // // xhr.open('POST', this.url, true);

        // // // this.headers.forEach(function(header){
        // // //   xhr.setRequestHeader(
        // // //     Object.keys(header)[0],
        // // //     header[Object.keys(header)[0]]
        // // //   );
        // // // });

        // // // var data = JSON.stringify({
        // // //   context   :   navigator.userAgent,
        // // //   messages  :   messages
        // // // });
        // // // xhr.send(data);
    }

    log(level, message, userLevel) {
        if (level <= userLevel || this.level) {
            this.send({
                level: level,
                message: message,
            });
        }
    }

    error(message, userLevel) {
        this.log(Logger.ERROR, message, userLevel);
    }

    warn(message, userLevel) {
        this.log(Logger.WARN, message, userLevel);
    }

    info(message, userLevel) {
        this.log(Logger.INFO, message, userLevel);
    }

    debug(message, userLevel) {
        this.log(Logger.DEBUG, message, userLevel);
    }
}

export const logger = new Logger({
    url: "http://example.com/api/batch-logger",
    //batch_size : 1,
    level: Logger.ERROR,
});

export default Logger;
