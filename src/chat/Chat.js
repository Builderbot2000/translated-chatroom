import '../css/Chatpage.scss'
import User_bar from "./User_bar";
import React from "react";

const Chat = ({ username, room, socket })=>{
    room = 'testsets'
    username = ['dafsda']
    return(
        <section id="chat-box">
            <fieldset>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                {/*<User_bar/>*/}

                <User_bar socket={socket} username={username} room={room}/>
                <div id='sentences'>bssss</div>
                <div id ='message'>csfsfsss</div>


            </fieldset>
        </section>
    );
}

export default Chat