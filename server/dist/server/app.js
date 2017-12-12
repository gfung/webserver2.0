"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dependencies
 */
// import { init } from 'pmx';
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const methodOverride = require("method-override");
const fs = require("fs");
const path = require("path");
/**
 * var definitions
 */
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.expressModule = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.expressModule.use(bodyParser.json());
        this.expressModule.use(bodyParser.urlencoded({ extended: true }));
        this.expressModule.use(expressValidator());
        this.expressModule.use(methodOverride());
        this.expressModule.use(expressValidator());
        this.expressModule.use(express.static(path.join(__dirname, 'public')));
    }
    // Configure API endpoints.
    routes() {
        // dependencies
        let router = express.Router();
        // read for backend modules and their routes
        let readdir = fs.readdirSync(path.join(__dirname, 'routing/rest'));
        for (var i = 0; i < readdir.length; i++) {
            // test if it is a directory
            let test = fs.lstatSync(path.join(__dirname + '/routing/rest', readdir[i])).isDirectory();
            // if true, then add to router module
            if (test) {
                // add sub routes to main app
                router.use('/' + readdir[i], require('./routing/rest/' + readdir[i]));
            }
        }
        router.get('/', (req, res, next) => {
            res.status(200).sendFile(path.join(__dirname, 'public/index.html'));
        });
        router.get('/healthz', (req, res, next) => {
            res.status(200).send();
        });
        // all other routes not designated
        router.get('*', (req, res, next) => {
            res
                .status(200)
                .redirect('/home');
        });
        // instantiate all routes
        this.expressModule.use('/', router);
    }
}
exports.default = new App().expressModule;
//# sourceMappingURL=app.js.map