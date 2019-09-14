import React, {Component} from 'react';
import {Button, Divider, Message} from 'semantic-ui-react'
import "./ButtonedMessage.css"
import {ACTOR_BOT} from "../../../Conversation";
import uuid from "uuid";

export const MESSAGE_BUTTON_TYPE = "MESSAGE";
export const LINK_BUTTON_TYPE = "LINK";
export const CALL_BUTTON_TYPE = "CALL";

class ButtonedMessage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {name, actor, text, buttons} = this.props;

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
                                           onClick={() => this.props.onRedirectButtonClick(text, redirectUrl, MESSAGE_BUTTON_TYPE)}/>
                        }
                        if (type === LINK_BUTTON_TYPE) {
                            return <Button key={uuid.v1()}
                                           content={text}
                                           onClick={() => this.props.onRedirectButtonClick(text, redirectUrl, LINK_BUTTON_TYPE)}/>
                        }
                        if (type === CALL_BUTTON_TYPE) {
                            return <Button key={uuid.v1()}
                                           content={text}
                                           icon='call'
                                           labelPosition='left'
                                           onClick={() => this.props.onRedirectButtonClick(text, redirectUrl, CALL_BUTTON_TYPE)}/>
                        }
                    })}</div>
                </Message>
            </div>
        )
    }
}

export default ButtonedMessage