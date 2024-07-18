import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
	ws.on('message', (message, isBinary) => {
		console.log('%s', message);
		wss.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message, { binary: isBinary });
			}
		});
	});
});
