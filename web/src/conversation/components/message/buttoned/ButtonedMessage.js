import React from 'react';
import {Button, Divider, Message} from 'semantic-ui-react'
import "./ButtonedMessage.css"
import {ACTOR_BOT} from "../../../Conversation";
import uuid from "uuid";

const MESSAGE_BUTTON_TYPE = "MESSAGE";
const LINK_BUTTON_TYPE = "LINK";
const CALL_BUTTON_TYPE = "CALL";

function ButtonedMessage({name, actor, text, buttons}) {

    return (
        <div className={`main buttonedMessage ${actor !== ACTOR_BOT ? "manMessage" : ""}`}>
            <Message negative={actor !== ACTOR_BOT} compact>
                <Message.Header>{name}</Message.Header>
                <Divider/>
                <Message.Content style={{fontSize: '1.2em'}}>{text}</Message.Content>
                <div style={{marginTop: '1.0em'}}> {buttons.map(({text, redirectUrl, type}) => {
                    if (type === MESSAGE_BUTTON_TYPE) {
                        return <Button key={uuid.v1()}
                                       content={text}
                                       onClick={console.log(redirectUrl)}/>
                    }
                    if (type === LINK_BUTTON_TYPE) {
                        return <Button key={uuid.v1()}
                                       content={text}
                                       onClick={() => window.open(redirectUrl, "_blank")}/>
                    }
                    if (type === CALL_BUTTON_TYPE) {
                        return <Button content='Call to consultant'
                                       icon='call'
                                       labelPosition='left'
                                       onClic={console.log("calling ...")}/>
                    }
                })}</div>
            </Message>
        </div>
    )
}

export default ButtonedMessage