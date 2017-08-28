import * as fs from 'fs';

export function chatRoutes(io,data) {
	console.log('a user connnected')
	data.on('a message', (message)=>{
		console.log(message)
		io.emit('a message', message)
	})

	data.on('disconnect', (message)=>{
		console.log("user disconnected")
	})

}
