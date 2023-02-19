import '../css/Chatpage.scss'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const User_bar = ({username, room, url}) =>{
    const [roomUsers, setRoomUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(url.concat("/getUser"), async (response) => {
            setRoomUsers(response)
            })
        }
    )

    const leaveRoom = () => {
        navigate('/', { replace: true });
    };

    return(
        <div id="user-bar">
            <h2>Room Name: {room}</h2>
            <div id = 'users'>
                <ul>
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