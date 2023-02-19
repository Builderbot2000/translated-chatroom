import '../css/chatroom.scss'
import Message from './Message';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import io from 'socket.io-client';
import {wait} from "@testing-library/user-event/dist/utils";


const ReceiveMessage = ({ username, url, language }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);

    function sortMessagesByDate(messages) {
        console.log('sort')
        console.log(messages)
        return messages.sort(
            (a, b) => parseInt(a.time) - parseInt(b.time)
        );
    }
    //receive messages
    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        () => {
            const timer = setTimeout(()=>{
                axios.get(url.concat('/getAll/fr')).then((r) => {
                    console.log(r.data[0].time)
                    setMessagesReceived(sortMessagesByDate(r.data))

                })
                console.log(Date.now())
            },100)
            return ()=> clearTimeout(timer)
        },[url]
    )

    //scroll to the most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesRecieved]);

    return (
        <div id='received' ref={messagesColumnRef}>
            {
                messagesRecieved.map((msg, i) => (
                    <Message message={msg} key={i} username={username}/>
                ))
            }
        </div>
    );
}
export default ReceiveMessage