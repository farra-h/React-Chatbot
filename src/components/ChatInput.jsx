import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages}){
        const [inputText, setInputText] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        async function sendMessage(){
            if (isLoading || inputText === '') {
                return;
            }

            setIsLoading(true);

            const newChatMessages = [
                ...chatMessages,{
                    message: inputText,
                    sender: "user",
                    id: crypto.randomUUID()
                },
                {
                    message: 'Loading...',
                    sender: "robot",
                    id: crypto.randomUUID()
                }
            ] 
            setChatMessages(newChatMessages);
            setInputText('');

            const response = await Chatbot.getResponseAsync(inputText);
            setChatMessages([
                ...newChatMessages.slice(0, newChatMessages.length - 1),{
                    message: response,
                    sender: "robot",
                    id: crypto.randomUUID()
                }
            ]);

            setIsLoading(false)
        }

        return (
            <div className="input-container">
                <input 
                    className="input"
                    placeholder="Send a message to Chatbot" 
                    size="30"
                    onChange= {(event)=>{
                        setInputText(event.target.value);
                    }} 
                    onKeyDown={(event) => {
                       if(event.key === 'Enter'){
                        sendMessage();
                       }
                    }}  
                    disabled = {isLoading}
                    value = {inputText}
                />
                <button 
                    className="send-button"
                    onClick={sendMessage}
                >Send</button>
            </div>
      )}