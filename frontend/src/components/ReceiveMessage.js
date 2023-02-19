import '../css/chatroom.scss'
import Message from './Message';
import {useEffect, useRef, useState} from 'react';
import axios from "axios";


const ReceiveMessage = ({ username, url, language }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);

    function sortMessagesByDate(messages) {
        const [hours1, minutes1, seconds1] = messages[0].time.split(':');
        return messages.sort(
            (a, b) => {
                const [hours1, minutes1, seconds1] = a.time.split(':');
                const [hours2, minutes2, seconds2] = b.time.split(':');
                const aTime = 60*60*parseInt(hours1) + 60*parseInt(minutes1) + parseInt(seconds1)
                const bTime = 60*60*parseInt(hours2) + 60*parseInt(minutes2) + parseInt(seconds2)
                return aTime - bTime
            }
        )
    }
    //receive messages
    useEffect(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        () => {
            const Timmer = setTimeout(()=>{
                axios.get(url.concat('/getAll/fr')).then((r) => {
                    setMessagesReceived(sortMessagesByDate(r.data))
                })
            }, 1000)
            return ()=> clearTimeout(Timmer)
        }
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