"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const https = require("https");
let router = express.Router();
const serverSecrets = require('../../../../../config/secrets.js');
router.route('/')
    .all((req, res, next) => {
    return next();
})
    .post((req, res, next) => {
    // TODO: Sanitise Inputs
    req.checkBody('x').isFloat();
    req.checkBody('y').isFloat();
    //req.body error handler
    let errors = req.validationErrors();
    if (errors) {
        next({ status: 400, message: errors });
        return;
    }
    // x are lat, y are long, darksky uses lat,long format
    let theDate = new Date().getDate();
    let dateArray = [];
    let weekData = [];
    for (let i = 1; i < 8; i++) {
        let aDate = Date.UTC(new Date().getFullYear(), new Date().getMonth(), theDate - i) / 1000;
        weekData.push(getWeather(aDate));
    }
    Promise.all(weekData).then((data) => {
        return res.send(data);
    });
    function getWeather(time) {
        return new Promise((resolve, reject) => {
            https.get('https://api.darksky.net/forecast/' + serverSecrets.darkSky.key + '/' + req.body.x + "," + req.body.y + "," + time, (res) => {
                if (res.statusCode != 200) {
                    reject();
                }
                res.on('data', (data) => {
                    let json = JSON.parse(data);
                    resolve(json);
                });
            });
        });
    }
});
router
    .route('*')
    .all(function (req, res, next) {
    res.send({ status: 404, message: "URL does not exist" });
});
module.exports = router;
//# sourceMappingURL=index.js.map