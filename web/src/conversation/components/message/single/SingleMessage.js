import React from 'react';
import {Divider, Message} from 'semantic-ui-react'
import "./SingleMessage.css"
import {ACTOR_BOT} from "../../../Conversation";

function SingleMessage({name, actor, text}) {

    return (
        <div className={`main singleMessage ${actor !== ACTOR_BOT ? "manMessage" : ""}`}>
            <Message negative={actor !== ACTOR_BOT} compact>
                <Message.Header className={actor !== ACTOR_BOT ? "rightText": ""}>{name}</Message.Header>
                <Divider />
                <Message.Content className={actor !== ACTOR_BOT ? "rightText": ""} style={{fontSize: '1.2em'}}>{text}</Message.Content>
            </Message>
        </div>
    )
}

export default SingleMessage