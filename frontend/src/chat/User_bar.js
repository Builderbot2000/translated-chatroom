import '../css/Chatpage.scss'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const User_bar = ({socket, username, room}) =>{
    const [roomUsers, setRoomUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        socket.on('chatroom_users', (data) => {
            console.log(data);
            setRoomUsers(data);
        });
        return () => socket.off('chatroom_users');
    },[socket])

    const leaveRoom = () => {
        const __createdtime__ = Date.now();
        socket.emit('leave_room', { username, room, __createdtime__ });
        // Redirect to home page
        navigate('/', { replace: true });
    };

    return(
        <div id="user-bar">
            <h2>Room Name: {room}</h2>
            <div id = 'users'>

                <ul>
                    000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
                    {roomUsers.map((user) => (
                        <li style={{
                            fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
                        }}>
                            {user.username}, {user.language}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={leaveRoom}>
                Leave
            </button>
        </div>
    )
}

export default User_bar