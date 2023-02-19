import './css/chatroom.scss'
import UserBar from "./components/UserBar";
import SendMessage from "./components/SendMessage";
import ReceiveMessage from "./components/ReceiveMessage";
import React, { useEffect } from "react";

const Chatroom = ({ username, url, language }) => {
    return (
        <section id="chat-box">
            <fieldset>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <UserBar url={url} username={username}/>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <ReceiveMessage url={url} username={username} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <SendMessage url={url} username={username} language={language}/>

            </fieldset>
        </section>
    );
}

export default Chatroom