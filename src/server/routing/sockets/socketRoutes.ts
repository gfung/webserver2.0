import * as fs from 'fs';
import * as socketIO from 'socket.io';
const route1 = require('./socketOne')

exports.make = (serv)=>{
	let io = socketIO(serv);
	// multiplexing channel
	let channels = [ io.of('/worldChat') ]
	// var wChat = io.of('/worldChat');
	// var lChat = io.of('/localChat');
	// var bChat = io.of('/battleChat');
	// var pChat = io.of('/partyChat');
	for (let i = 0;i < channels.length;i++){
		route1.onConnect(channels[i])
	}
	// route1.onConnect(wChat)
	// route1.onConnect(pChat)
}
