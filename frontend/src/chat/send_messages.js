import '../css/Chatpage.scss'
import React, { useState } from 'react';
import axios from "axios";

const Send_messages = ({url, username, language}) =>{
    const [message,setMessage] = useState('');
    const sendMessage = () => {
        if (message !== '') {
            axios.post(url.concat('/addMessage'),{
                name: username,
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