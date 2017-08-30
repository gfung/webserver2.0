exports.onConnect = (io) => {
	io.on('connection', (socket) => {
		// immediately send a msg upon connection
		socket.emit('chat msg', "pop")
		socket.on('chat msg', (message) => {
			io.emit('chat msg', message)
		})

		socket.on('disconnect', (message) => {
			// clear user from that chat
		})
	})
}

