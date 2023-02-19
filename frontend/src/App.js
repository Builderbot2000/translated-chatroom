import './css/entry.scss';
import { useState } from 'react';
import EntryPage from "./Entry";
import Chatroom from "./Chatroom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";
const baseURL = 'http://localhost:3001'
const App = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [language, setLanguage] = useState('')
    return(
        <Router>
            <div className='App'>
                <Routes>
                    <Route
                        path=''
                        element={
                            <EntryPage
                                username={username}
                                setUsername={setUsername}
                                room={room}
                                setRoom={setRoom}
                                language={language}
                                setLanguage={setLanguage}
                                url={baseURL}
                            />
                        }
                    />
                    {/* Add this */}
                    <Route
                        path='/chat'
                        element={<Chatroom username={username} room={room} url={baseURL} language={language}/>}
                    />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
