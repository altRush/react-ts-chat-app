import { useCallback, useEffect, useState } from 'react';
import './index.css';
import useWebSocket from 'react-use-websocket';
import { WebSocketMessage } from 'react-use-websocket/dist/lib/types';

const WS_URL = 'ws://localhost:8080';

const ChatBox = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

	const [chatText, setChatText] = useState('');
	const [sender, setSender] = useState('');

	const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
		onOpen: () => {
			console.log('Opened !');
		}
	});

	const handleClickSendMessage = useCallback(
		(message: WebSocketMessage) => sendMessage(message),
		[sendMessage]
	);

	const isSender = (incomingSender: string): boolean => {
		return sender === incomingSender;
	};

	useEffect(() => {
		if (lastMessage !== null) {
			setMessageHistory(prev => prev.concat(lastMessage));
		}
	}, [lastMessage]);

	return (
		<div className="chatbox-container">
			<div>
				<img className="chat-logo" src={'/chat-room.svg'} alt="" />
				<h3>
					Just <span className="talk-logo">talk</span>™
				</h3>
				<div>
					Name:
					<input
						onChange={e => {
							setSender(e.target.value);
						}}
						type="text"
					/>
				</div>
			</div>
			<div className="chat-box">
				<div className="chat-box-title">Chat</div>
				<div className="chat-box-body">
					{messageHistory.map((message, idx) => {
						const { sender, messageText } = JSON.parse(message.data);
						const ownMessage = isSender(sender);
						return (
							<div className={ownMessage ? 'sender-text' : ''} key={idx}>
								{messageText
									? `${!ownMessage ? `[${sender}] ` : ''}${messageText}`
									: null}
							</div>
						);
					})}
				</div>
				<div className="chat-box-input">
					<div>
						<input
							value={chatText}
							onChange={e => setChatText(e.target.value)}
							placeholder="..what's on your mind?"
							type="text"
						/>
					</div>
					<div>
						<img
							className="send-message-icon"
							src={'/send-message.svg'}
							alt=""
							onClick={() => {
								handleClickSendMessage(
									JSON.stringify({
										sender,
										messageText: chatText
									})
								);
								setChatText('');
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatBox;
