const http = require('http');

/**
 * @function wrapInTryCatch
 * @description Wraps a code block in try/catch statement
 * @param {Function} tryBody
 */
const wrapInTryCatch = (tryBody) => {
    try {
        return tryBody();
    }
    catch (err) {
        console.log("here we caught it", err);
    }
}

/**
 * @function JSONResponse
 * @description Convert JavaScript simple object to `JSON` format
 * @param {object} data 
 * @returns {json} data
 */
const JSONResponse = (data) => JSON.stringify(data);

/**
 * @function httpRequest
 * @description Wraps http request method in a Promise
 * @param {*} params 
 * @param {*} postData 
 * @returns {Promise} Request
 */
const httpRequest = (url, params, postData) => {
    return new Promise(function(resolve, reject) {
        var req = http.request(url, params, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            console.log(err,"error")
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

/**
 * @function sendResponse
 * @description Send response to client
 * @param {Response} res
 * @param {Number} statusCode
 * @param {String} contentType
 * @param {*} responseBody
 * @param {Boolean} endResponse
 */
const sendResponse = (res, statusCode, contentType, responseBody, endResponse= false) => {
    res.writeHead(statusCode, {"Content-Type": contentType});
    res.write(responseBody);
    if(endResponse) res.end();
}

module.exports = { JSONResponse, httpRequest, sendResponse, wrapInTryCatch };