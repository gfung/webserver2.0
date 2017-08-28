/**
 * Dependencies
 */
import { init } from 'pmx';
import * as express from 'express';
import * as session from 'express-session';
import * as socketIO from 'socket.io';
// import * as socketHandshake from 'socket.io-handshake';
// import * as flash from 'express-flash';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as lusca from 'lusca';
import * as mongoStore from 'connect-mongo';
import * as expressValidator from 'express-validator';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import * as connectAssets from 'connect-assets';
import * as crypto from 'crypto';
// import * as cors from 'cors';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

/**
 * var definitions
 */
//mongo sessions
let mongoSession = mongoStore(session);

class App {
	// ref to Express instance
	public express: express.Application;

	//Run configuration methods on the Express instance.
	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		// this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(expressValidator());
		this.express.use(methodOverride());
		this.express.use(cookieParser());
		this.express.use(session({
			store: new mongoSession({
				url: 'mongodb://localhost/http2test',
				autoReconnect: true,
				clear_interval: 3600
			}),
			secret: "teeHeeIloveSecrets",
			resave: false,
			saveUninitialized: false
		}));
		this.express.use(passport.initialize());
		this.express.use(passport.session());
		// this.express.use(flash());
		this.express.use(expressValidator());
		this.express.use(lusca({
			csrf: true,
			xframe: 'SAMEORIGIN',
			xssProtection: true
			// angular:true
		}))
		this.express.use(express.static('public'))
		// this.express.use(cors(options));


		/**
		 *	import from modules folder
		 */
		// let modules = []; // Declare the module storage
		// let tempModules = fs.readdirSync("./dist/modules");
		// let pathJoins = ['public'];
		// for (var i = 0; i < tempModules.length; i++) {
		// 	// Make sure we are not loading hidden folders
		// 	if (tempModules[i].charAt(0) != ".") {
		// 		try {
		// 			// Load module
		// 			modules[tempModules[i]] = require('./modules/' + tempModules[i]);

		// 			// Push the join folder into pathJoins
		// 			pathJoins.push('modules/' + tempModules[i] + '/public/js');
		// 			pathJoins.push('modules/' + tempModules[i] + '/public/css');
		// 			pathJoins.push('modules/' + tempModules[i] + '/public/images');
		// 			this.express.use(express.static('modules/' + tempModules[i] + '/views'))
		// 			this.express.use(express.static('modules/' + tempModules[i] + '/public'))
		// 		} catch (e) {
		// 			// Catch and log any errors
		// 			console.log(e);
		// 		}
		// 	} else {
		// 		// Warn of the hidden folder
		// 		console.log("Error Loading Application: " + tempModules[i] + ", It's a hidden file.");
		// 	}
		// }
	}

	// Configure API endpoints.
	private routes(): void {
		/* This is just to get up and running, and to make sure what we've got is
		 * working so far. This function will change when we start to add more
		 * API endpoints */
		let router = express.Router();
		// placeholder route handler
		router.get('/', (req, res, next) => {
			res
				.status(200)
				.sendFile(path.join(__dirname, 'public/index.html'))
		});
		this.express.use('/', router);
	}


}

export default new App().express;
