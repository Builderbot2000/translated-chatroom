import './css/entry.scss';
import { useState } from 'react';
import EntryPage from "./Entry";
import Chatroom from "./Chatroom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const baseURL = 'http://localhost:4000'
const App = () => {
    const [userID, setUserID] = useState(-1)
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [language, setLanguage] = useState('')
    return(
        <Router>
            <div className='App'>
                <Routes>
                    <Route
                        path=''
                        element={
                            <EntryPage
                                userID = {userID}
                                setUserID={setUserID}
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
                        element={<Chatroom userID={userID} username={username} room={room} url={baseURL} language={language}/>}
                    />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
