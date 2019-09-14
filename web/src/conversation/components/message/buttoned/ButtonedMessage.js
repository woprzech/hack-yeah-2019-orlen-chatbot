import React from 'react';
import {Button, Message} from 'semantic-ui-react'
import "./ButtonedMessage.css"
import {ACTOR_BOT} from "../../../Conversation";
import uuid from "uuid";

function SingleMessage({name, actor, text, buttons}) {

    return (
        <div className={`main ${actor !== ACTOR_BOT ? "manMessage" : ""}`}>
            <Message negative={actor !== ACTOR_BOT} compact>
                <Message.Header>{name}</Message.Header>
                <Message.Content>{text}</Message.Content>
                {buttons.map(({value, link}) => {
                    return <Button key={uuid.v1()} content={value} onClick={console.log(link)}/>
                })}
            </Message>
        </div>
    )
}

export default SingleMessage