import '../css/chatroom.scss'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import io from 'socket.io-client';

const socket = io(process.env.SOCKET_ENDPOINT)

const SendMessage = ({url, username, language, userID}) =>{

    const [message,setMessage] = useState('');
    
    const sendMessage = () => {
        if (message !== '') {
            const date = Date.now()
            const temp = {
                userID: userID,
                name: username,
                message: message,
                language: language,
                time: date
            }
            console.log(temp)
            axios.post(url.concat('/addMessage'),{
                userID: userID,
                name: username,
                message: message,
                language: language,
                time: date
            })
            setMessage('')
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

export default SendMessage