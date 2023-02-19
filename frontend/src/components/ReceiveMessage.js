import '../css/chatroom.scss'
import Message from './Message';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import io from 'socket.io-client';

const socket = io(process.env.SOCKET_ENDPOINT)

const ReceiveMessage = ({ userID, url, language }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);

    //receive messages
    useEffect(() => {
        axios.get(url.concat(`/getAll/:${language}`), async response => {
            console.log(response)
            setMessagesReceived(response)
            })
        }
    );

    socket.on('message', (newMessage) => {
        console.log('You have got mail!')
        messagesRecieved.push(newMessage)
    })

    //scroll to the most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesRecieved]);

    return (
        <div id='received' ref={messagesColumnRef}>
            {
                messagesRecieved.map((msg, i) => (
                    <Message message={msg} key={i}/>
                ))
            }
        </div>
    );
}
export default ReceiveMessage