import '../css/Chatpage.scss'
import React, { useState } from 'react';
import axios from "axios";

const Send_messages = ({url, username, language}) =>{
    const [message,setMessage] = useState('');
    const sendMessage = () => {
        if (message !== '') {
            // const __createdtime__ = Date.now();
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            // socket.emit('send_message', { username, room, message,language,__createdtime__ });
            axios.post(url.concat('/addMessage'),{
                name: username[0],
                message:message,
                language: language,
            })
            axios.get(url).then(
                (response)=>{
                    console.log(response)
                }
            )
            setMessage('');
        }
    };
    return (
        <div id='message'>
            <textarea
                placeholder='Message...'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button className='btn btn-primary' onClick={sendMessage}>
                Send Message
            </button>
        </div>
    );
}

export default Send_messages