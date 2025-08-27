import userProfile from '../assets/img/user.png';
import robotProfile from '../assets/img/robot.png';
import './ChatMessage.css'

export function ChatMessage(props){
        const {message, sender} = props; 
        return (
            <div className={
                sender === 'user'
                ? 'user-message'
                : 'robot-message'
            }>
                {sender === 'robot' && (
                    <img src={robotProfile} width="45" />
                )}
                <div className="chat-text">
                    {message}
                </div>
                {sender === 'user' && (
                    <img src={userProfile} width="45" />
                )}
            </div>
)}