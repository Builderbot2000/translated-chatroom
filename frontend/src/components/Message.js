import '../css/chatroom.scss'

const formatDateFromTimestamp = timestamp => {
    const date = new Date(timestamp);
    return timestamp;
}

const Message = ({key, message, userID}) => {
    if(message.userID !== userID){
        return (
            <div className='block' key={key}>
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
            <div className='block' key={key} style={{backgroundColor:'blue', float:'right'}}>
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