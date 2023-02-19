import './css/Chatpage.scss'
import User_bar from "./components/UserBar";
import Send_messages from "./components/SendMessage";
import Receive_messages from "./components/ReceiveMessage";
import React from "react";

const Chat = ({ username, room, url,language})=>{
    room = 'testsets'
    username = ['dafsda']
    return(
        <section id="chat-box">
            <fieldset>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <User_bar url={url} username={username} room={room}/>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Receive_messages url={url} username={username}/>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Send_messages url={url} username={username} room={room} language={language}/>

            </fieldset>
        </section>
    );
}

export default Chat