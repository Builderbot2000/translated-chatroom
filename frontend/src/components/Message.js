import '../css/chatroom.scss'

const formatDateFromTimestamp = timestamp => {
    const date = new Date(timestamp);
    return timestamp;
}

const Message = ({key, message, username}) => {
    if(message.name !== username){
        return (
            <div className='block' style={{float:'left'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="meta_data">{message.name}</span>
                    <span className="meta_data">
                        {formatDateFromTimestamp(message.time)}
                    </span>
                </div>
                <p className="text">{message.message}</p>
                <br />
            </div>
        )
    }else{
        return (
            <div className='block' style={{backgroundColor:'#a0f2ee', float:'right'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="meta_data">{message.name}</span>
                    <span className="meta_data">
                        {formatDateFromTimestamp(message.time)}
                    </span>
                </div>
                <p className="text">{message.message}</p>
                <br />
            </div>
        )
    }
    
}

export default Message