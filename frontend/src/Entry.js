import React from 'react';
import axios from "axios";
import './css/entry.scss'
import {useNavigate} from "react-router-dom";


const EntryPage = ({username, setUsername, room, setRoom, socket, language, setLanguage, url})=>{
    const navigate = useNavigate();

    // Event handler for clicking the Join Room! button
    const joinRoom =()=>{
        console.log(username)
        console.log(room)
        console.log(setLanguage)
        navigate('/chat', { replace: false });
    }

    return(
        <section id="entry-page">
            <form>
                <h2>Lost in Translation</h2>
                <fieldset>
                    <legend>Login</legend>
                    <ul>
                        <li>
                            <label htmlFor="nickname">Nickname:</label>
                            <input type="text" id="username"
                                   onChange={(e) => setUsername(e.target.value)}
                                   required/>
                        </li>
                        <li>
                            <label htmlFor="Room">Room:</label>
                            <input type="text" id="Room"
                                   onChange={(e) => setRoom(e.target.value)}
                                   required/>
                        </li>
                        <li>
                            <label htmlFor="Language">Language:</label>
                            <select onChange={(e) => setLanguage(e.target.value)}>
                                <option value='Chinese'>Chinese</option>
                                <option value='English'>English</option>
                                <option value='Indian'>Indian</option>
                            </select>
                        </li>
                    </ul>
                </fieldset>
                <button onClick={joinRoom}>Join Room!</button>
            </form>
        </section>
    )
}

export default EntryPage