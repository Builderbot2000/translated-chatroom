import '../css/chatroom.scss'
import Message from './Message';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import io from 'socket.io-client';


const ReceiveMessage = ({ userID, url, language }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);

    //receive messages
    useEffect(() => {
            console.log('receive message')
            console.log(url.concat('/getAll/fr'))
            axios.get(url.concat('/getAll/fr')).then((r) => console.log('get response'))
        }
    );


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