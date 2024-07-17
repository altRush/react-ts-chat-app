import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
	ws.on('message', (message, isBinary) => {
		wss.clients.forEach(client => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message, { binary: isBinary });
			}
		});
	});
});
