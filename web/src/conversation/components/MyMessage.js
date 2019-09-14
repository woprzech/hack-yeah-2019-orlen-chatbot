import React from 'react';
import {Message} from 'semantic-ui-react'
import "./MyMessage.css"

function MyMessage({name, actor, text}) {

    return (
        <div className={`main ${actor !== "BOT" ? "manMessage" : ""}`}>
            <Message
                negative={actor !== "BOT"}
                header={name}
                content={text}
                compact
            />
        </div>
    )
}

export default MyMessage