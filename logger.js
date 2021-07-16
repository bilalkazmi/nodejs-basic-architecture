const { red, green, cyan } = require('chalk');
const fs = require('fs');
const path = require('path');
const url = require('url');

/**
 * @function debugLine
 * @description Prints the line number where error is thrown. 
 * @param {String} message 
 * @returns {String}
 */
const debugLine = (message)=> {
    let e = new Error();
    let frame = e.stack.split("\n")[3]; 
    let lineNumber = frame.split(":").reverse()[1];
    let functionName = frame.split(" ")[5];
    return functionName + ":" + lineNumber + " " + message;
}

/**
 * @function checkEnvironment
 * @description checks if the given `env` variable is present in env
 * @param {Function} callBack calls the callback function if `env` is present in environment variables
 * @param {String} env the env string, a key to search inside environment variables
 * @returns {Function}
 */
const checkEnvironment = (callBack, env) => {
    if (process.env[env]) {
        return callBack;
    }
    else {
        // Here instead of callback, we return empty function to not throw exceptions
        // as we always expect a function to return
        return ()=>{}
    }
}

module.exports = {
    mainLogger: checkEnvironment((req) => {
            console.log(cyan(`Timestamp:${new Date().getTime()} | Host: ${req.hostname} | Url: ${req.path} | Method: ${req.method}`));
        }, 'DEV'),
    debugger: checkEnvironment((message) => {
            console.log(green(`Timestamp:${new Date().getTime()} | ${message}`));
    }, 'DEV'),
    error: checkEnvironment((message) => {
            console.error(red(debugLine(`Timestamp:${new Date().getTime()} | ${message}`)));
    }, 'DEV'),
    debuggerLocal: checkEnvironment((message) => {
        fs.appendFile('./logs.txt', `Timestamp:${new Date().getTime()} | ${message}\r\n`, function (err) {
            if (err) console.error(`Timestamp:${new Date().getTime()} | ${err}`);
            console.log(green(`Timestamp:${new Date().getTime()} | Log saved locally`));
          });
    }, 'DEV')
}