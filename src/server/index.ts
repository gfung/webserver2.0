/**
 * dependencies
 */
// import * as http from 'https';
import * as spdy from 'spdy'
import App from './app';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import * as socketIO from 'socket.io';
import * as socketRoutes from './routing/sockets/socketRoutes';
/**
 *  vars
 */
const options = {
	key: fs.readFileSync('./config/server.key', 'utf8'),
	cert: fs.readFileSync('./config/server.crt', 'utf8'),
	// **optional** SPDY-specific options
	spdy: {
		protocols: ['h2', 'spdy/3.1', 'http/1.1'],
		plain: false,

		// **optional**
		// Parse first incoming X_FORWARDED_FOR frame and put it to the
		// headers of every request.
		// NOTE: Use with care! This should not be used without some proxy that
		// will *always* send X_FORWARDED_FOR
		'x-forwarded-for': true,

		connection: {
			windowSize: 1024 * 1024, // Server's window size

			// **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
			autoSpdy31: false
		}
	}
}
const port = normalizePort(process.env.PORT || 8080);
const server = spdy.createServer(options, App);

/**
 * functions
 */

/**
 * normalize port number
 *
 * @param {(number | string)} val
 * @returns {(number | string | boolean)}
 */
function normalizePort(val: number | string): number | string | boolean {
	let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
	if (isNaN(port)) return val;
	else if (port >= 0) return port;
	else return false;
}

/**
 * nodejs error handler
 *
 * @param {NodeJS.ErrnoException} error
 */
function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') throw error;
	let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Server listening
 *
 * @param {null} none
 */
function onListening(): void {
	let addr = server.address();
	let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
	console.log(`Listening on %s`, bind);
}

/**
 * logic
 */

//Connect to Mongo
mongoose.connect('mongodb://localhost/http2test', { useMongoClient: true });
mongoose.connection.on('error', function () {
	console.error('Could not connect to MongoDB');
});

// setup socket on server.
const io = socketIO(server);
// Configure Socket channels
// Multiplexing single channel
// chat channel
// var chat1 = io
// 	.of('/chat')
// 	.on('connection', (socket)=>{
// 		// chat1.emit('a message', "hi")
// 		socketRoutes.chatRoutes(io,socket);
// 		// socket.on("a message", (msg)=>{
// 		// 	console.log(msg)
// 		// })
// 		socket.on("disconnect", (data)=>{
// 			console.log("disconnected1")
// 		})
// 	})

// main channel
io.on('connection', (socket) => {
	socketRoutes.chatRoutes(io, socket);
})

//set port
App.set('port', port);

server.listen(port, (error) => {
	if (error) {
		onError(error);
	} else {
		onListening();
	}
});
