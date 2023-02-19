import '../css/Chatpage.scss'
import { useState, useEffect, useRef } from 'react';

const Receive_messages = ({socket, username}) =>{
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);

    function sortMessagesByDate(messages) {
        return messages.sort(
            (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
        );
    }
    //receive messages
    useEffect(()=>{
            socket.on('receive message',(data) => {
                console.log(data)
                setMessagesReceived((state)=>[
                    ...state,
                    {
                        message:data.message,
                        username:data.username,
                        __createdtime__: data.__createdtime__,
                    },
                ]);
            });
        return ()=>socket.off('receive_message');
        },
        [socket]
    );

    //receive previous messages
    useEffect(()=>{
        socket.on('message_previous', (last1minMessages)=>{
            console.log("Last 1 min messages", JSON.parse(last1minMessages));
            last1minMessages = JSON.parse(last1minMessages)
            last1minMessages = sortMessagesByDate(last1minMessages);
            setMessagesReceived((state) => [...last1minMessages, ...state]);
        });
        return ()=>socket.off('message_previous')
    },[socket]);

    //scroll to the most recent message
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesRecieved]);

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return(
        <div id = 'received' ref={messagesColumnRef}>
            {
                messagesRecieved.map((msg,i)=>(
                    <div className='block' key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="meta_data">{msg.username}</span>
                            <span className="meta_data">
                            {formatDateFromTimestamp(msg.__createdtime__)}
                             </span>
                        </div>
                        <p className="text">{msg.message}</p>
                        <br />
                    </div>
                ))
            }
            <div className={'block'} key={1}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="meta_data">username</span>
                    <span className="meta_data">
                        Date at here
                    </span>
                </div>
                <p className="text">this is pieces of message</p>
                <br />
            </div>
            <div className={'block'} key={2} style={{float:'right', backgroundColor:'#4abdff'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="meta_data">username</span>
                    <span className="meta_data">
                        Date at here
                    </span>
                </div>
                <p className="text">
                    this is pieces of message
                    test test
                </p>
                <br />
            </div>
        </div>
    );
}
export default Receive_messages