import * as fs from 'fs';
import * as socketIO from 'socket.io';
const route1 = require('./socketOne')

exports.make = (serv)=>{
	// console.log(serv)
	let io = socketIO(serv);
	// multiplexing channel
	// let channels = [ io.of('/worldChat') ]
	let channels = [];
	// var wChat = io.of('/worldChat');
	// var lChat = io.of('/localChat');
	// var bChat = io.of('/battleChat');
	// var pChat = io.of('/partyChat');
	// for (let i = 0;i < channels.length;i++){
	// 	route1.onConnect(channels[i])
	// }

	io.on('connection',(socket)=>{
		socket.on('commands', (message)=>{
			// console.log(message)
			channels.push( io.of('/'+message) );
			// console.log(channels)
			route1.newRoom(channels[channels.length - 1])
			socket.emit('created', 'y')
		})
	})

}
