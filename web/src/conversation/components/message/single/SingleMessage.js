import React from 'react';
import {Message} from 'semantic-ui-react'
import "./SingleMessage.css"
import {ACTOR_BOT} from "../../../Conversation";

function SingleMessage({name, actor, text}) {

    return (
        <div className={`main ${actor !== ACTOR_BOT ? "manMessage" : ""}`}>
            <Message
                negative={actor !== ACTOR_BOT}
                header={name}
                content={text}
                compact
            />
        </div>
    )
}

export default SingleMessage