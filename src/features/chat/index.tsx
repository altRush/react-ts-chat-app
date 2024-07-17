import { useEffect, useState } from 'react';
import './index.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WS_URL = 'ws://localhost:8080';

const ChatBox = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

	const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
		onOpen: () => {
			console.log('Opened !');
		}
	});

	useEffect(() => {
		if (lastMessage !== null) {
			setMessageHistory(prev => prev.concat(lastMessage));
		}
	}, [lastMessage]);

	// const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

	// const connectionStatus = {
	// 	[ReadyState.CONNECTING]: 'Connecting',
	// 	[ReadyState.OPEN]: 'Open',
	// 	[ReadyState.CLOSING]: 'Closing',
	// 	[ReadyState.CLOSED]: 'Closed',
	// 	[ReadyState.UNINSTANTIATED]: 'Uninstantiated'
	// }[readyState];

	return (
		<div className="chatbox-container">
			<div>
				<img className="chat-logo" src={'/chat-room-svgrepo-com.svg'} alt="" />
				<h3>
					Just <span className="talk-logo">talk</span>™
				</h3>
			</div>
			<div className="chat-box">
				<div className="chat-box-title">Chat</div>
				<div className="chat-box-body">
					{messageHistory.map((message, idx) => {
						console.log(message.data);
						return <div key={idx}>{message ? message.data : null}</div>;
					})}
				</div>
			</div>
		</div>
	);
};

export default ChatBox;
