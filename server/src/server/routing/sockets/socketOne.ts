exports.onConnect = (io) => {
	io.on('connection', (socket) => {
		// immediately send a msg upon connection
		// console.log(socket.conn.socket.id)
		// console.log('we have a secondary connection')
		socket.emit('chat msg', "pop")
		socket.on('chat msg', (message) => {
			io.emit('chat msg', message)
		})

		// socket.on('commands', (message)=>{
		// 	console.log(message)
		// 	switch (message) {
		// 		case 'new':

		// 			break;
		// 	}
		// })

		socket.on('disconnect', (message) => {
			// clear user from that chat
		})
	})
}

exports.newRoom = (io) =>{
	// console.log(io)
	io.on('connection', (socket) => {
		// console.log(socket.conn)
		// console.log('connected to ')
	})
}
