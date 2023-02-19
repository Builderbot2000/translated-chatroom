import './css/chatroom.scss'
import UserBar from "./components/UserBar";
import SendMessage from "./components/SendMessage";
import ReceiveMessage from "./components/ReceiveMessage";
import React, { useEffect } from "react";

const Chatroom = ({ userID, username, url, language }) => {
    return (
        <section id="chat-box">
            <fieldset>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <UserBar url={url} userID={userID} username={username} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <ReceiveMessage url={url} userID={userID} language={language}/>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <SendMessage url={url} username={username} language={language} userID = {userID}/>
                <center>uid: {userID}</center>
            </fieldset>
        </section>
    );
}

export default Chatroom