/**
 * Dependencies
 */
import { init } from 'pmx';
import * as express from 'express';
import * as session from 'express-session';
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
	public expressModule: express.Application;

	//Run configuration methods on the Express instance.
	constructor() {
		this.expressModule = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		// this.express.use(logger('dev'));
		this.expressModule.use(bodyParser.json());
		this.expressModule.use(bodyParser.urlencoded({ extended: true }));
		this.expressModule.use(expressValidator());
		this.expressModule.use(methodOverride());
		this.expressModule.use(cookieParser());
		this.expressModule.use(session({
			store: new mongoSession({
				url: 'mongodb://localhost/http2test',
				autoReconnect: true,
				clear_interval: 3600
			}),
			secret: "teeHeeIloveSecrets",
			resave: false,
			saveUninitialized: false
		}));
		this.expressModule.use(passport.initialize());
		this.expressModule.use(passport.session());
		// this.express.use(flash());
		this.expressModule.use(expressValidator());
		this.expressModule.use(lusca({
			csrf: true,
			xframe: 'SAMEORIGIN',
			xssProtection: true
			// angular:true
		}))
		// this.expressModule.use(express.static('public'))
		// this.express.use(cors(options));

	}

	// Configure API endpoints.
	private routes(): void {
		// dependencies
		let router = express.Router();
		// read for backend modules and their routes
		let readdir = fs.readdirSync(path.join(__dirname, 'routing/rest'))
		for (var i = 0;i < readdir.length;i++){
			// test if it is a directory
			let test = fs.lstatSync(path.join(__dirname+'/routing/rest', readdir[i])).isDirectory()
			// if true, then add to router module
			if (test){
				// add sub routes to main app
				router.use('/'+readdir[i],require( './routing/rest/'+readdir[i] ))
			}
		}

		// all other routes not designated
		router.get('*', (req, res, next) => {
			res
				.status(200)
				.redirect('/home')
		});
		// instantiate all routes
		this.expressModule.use('/', router);
	}
}

export default new App().expressModule;
