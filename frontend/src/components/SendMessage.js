import '../css/chatroom.scss'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import io from 'socket.io-client';

let socket

const SendMessage = ({url, username, language}) =>{

    useEffect = (() => {
        socket = io(process.env.SOCKET_ENDPOINT)},
        [process.env.SOCKET_ENDPOINT])

    const [message,setMessage] = useState('');
    
    const sendMessage = () => {
        if (message !== '') {
            axios.post(url.concat('/addMessage'),{
                name: username,
                message: message,
                language: language,
            })
            axios.get(url).then(
                (response)=>{
                    console.log(response)
                }
            )
            socket.emit('sentMessage', message, () => setMessage(''));
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