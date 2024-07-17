import './index.css';

const ChatBox = () => {
	return (
		<div className="chatbox-container">
			<div>
				<img
					className="chat-logo"
					src={'../../public/chat-room-svgrepo-com.svg'}
					alt=""
				/>
				<h3>
					Just <span className="talk-logo">talk</span>™
				</h3>
			</div>
			<div className="chat-box">
				<div className="chat-box-title">Chat</div>
				<div className="chat-box-body">YOLO</div>
			</div>
		</div>
	);
};

export default ChatBox;
