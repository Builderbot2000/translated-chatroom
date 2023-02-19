import '../css/chatroom.scss'
import Message from './Message';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";

const ReceiveMessage = ({ username, url, language }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);

    // function sortMessagesByDate(messages) {
    //     return messages.sort(
    //         (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    //     );
    // }

    //receive messages
    useEffect(() => {
        axios.get(url.concat(`/getAll/:${language}`), async response => {
            console.log(response)
            setMessagesReceived(() => response)
        })
    }
    );

    //receive previous messages
    // useEffect(()=>{
    //     socket.on('message_previous', (last1minMessages)=>{
    //         console.log("Last 1 min messages", JSON.parse(last1minMessages));
    //         last1minMessages = JSON.parse(last1minMessages)
    //         last1minMessages = sortMessagesByDate(last1minMessages);
    //         setMessagesReceived((state) => [...last1minMessages, ...state]);
    //     });
    //     return ()=>socket.off('message_previous')
    // },[socket]);

    //scroll to the most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesRecieved]);

    return (
        <div id='received' ref={messagesColumnRef}>
            {
                messagesRecieved.map((msg, i) => (
                    <Message message={msg} key={i} />
                ))
            }
            <Message message={{
                "name": "Victor",
                "language": "en",
                "message": "Bonjour!",
                "time": "1:27:58"
            }} key={1} />
            <Message message={{
                "name": "Kevin",
                "language": "de",
                "message": "Je suis un homme.",
                "time": "2:4:31"
            }} key={2} />
        </div>
    );
}
export default ReceiveMessage