import * as fs from 'fs';

export function chatRoutes(io, namspa) {
	namspa.emit('chat msg', "hi")

	namspa.on('chat msg', (message)=>{
		console.log(message, 'io and namspa')

		namspa.emit('a message', message)

	})

	namspa.on('disconnect', (message)=>{
		console.log("user disconnected")
	})

}

export function battleRoutes(io, namspa) {
	namspa.emit("battle msg","boo!")

	// shit don't work
	// data.on('battle msg', (message)=>{
	// 	io.emit('a message', message)
	// })

	// data.on('disconnect', (message)=>{
	// 	console.log("user disconnected")
	// })

}
