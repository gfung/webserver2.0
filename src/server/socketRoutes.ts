import * as fs from 'fs';

export function chatRoutes(io,data) {
	data.on('a message', (message)=>{
		io.emit('a message', message)
	})

	data.on('disconnect', (message)=>{
		console.log("user disconnected")
	})

}
