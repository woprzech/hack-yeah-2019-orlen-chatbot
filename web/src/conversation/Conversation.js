import React, {Component} from 'react';
import {Container, Segment} from "semantic-ui-react";
import MyHeader from "./components/MyHeader"
import InputControl from "./components/messagecontrol/InputControl";
import uuid from "uuid"
import './Conversation.css';
import RasaHttp from "../http/RasaHttp"
import ButtonedMessage from "./components/message/buttoned/ButtonedMessage";
import SingleMessage from "./components/message/single/SingleMessage";

export const WORKER_NAME = "Patryk Super Pracownik";
export const ACTOR_BOT = "BOT";
export const ACTOR_MAN = "MAN";
export const BOT_NAME = "Bot Orlen HR";

class Conversation extends Component {

    constructor(props) {
        super(props);
        this.rasa = new RasaHttp();
        this.state = {
            messages: [
                {name: WORKER_NAME, text: "a asd asd asd asdasdasd asd asd ", actor: ACTOR_MAN},
                {
                    name: BOT_NAME,
                    text: "asd asd asd asd a! asd asd ",
                    actor: ACTOR_BOT,
                    buttons: [
                        {text: "Multisport", redirectUrl: "wp.pl", type: "LINK"},
                        {text: "Ok system", redirectUrl: "wp.pl", type: "LINK"},
                        {text: "Be Active", redirectUrl: "wp.pl", type: "LINK"}
                    ]
                },
                {name: WORKER_NAME, text: "asd asd asd", actor: ACTOR_MAN},
                {
                    name: BOT_NAME,
                    text: "Nie mam pojęcia mordo, dźwoń! ",
                    actor: ACTOR_BOT,
                    buttons: [
                        {text: "", redirectUrl: "wp.pl", type: "CALL"},
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        this.setState({generatedUserId: uuid.v1()});
    }

    renderMessage(message) {
        return (<div key={uuid.v1()}>{!message.buttons ?
                <SingleMessage key={uuid.v1()}
                               text={message.text}
                               actor={message.actor}
                               name={message.name}/> :
                <ButtonedMessage key={uuid.v1()}
                                 text={message.text}
                                 actor={message.actor}
                                 name={message.name}
                                 buttons={message.buttons}/>

            }</div>
        );

    }

    handleResponse = data => {
        this.setState({
            messages: [...this.state.messages, ...data.map(it => ({
                text: it.text,
                actor: ACTOR_BOT,
                name: BOT_NAME
            }))]
        })
    };

    render() {
        return (
            <>
                <MyHeader/>
                <Container className="app-container">
                    <Segment.Group className="app-segments">
                        <Segment
                            className="conversation">
                            <div>{this.state.messages.map(message => this.renderMessage(message))}</div>
                        </Segment>

                        <Segment textAlign='right'>
                            <InputControl onButtonClick={(message) => {
                                this.setState({
                                    messages: [...this.state.messages, {
                                        name: WORKER_NAME,
                                        text: message,
                                        actor: ACTOR_MAN
                                    }]
                                });

                                this.rasa.ask(message).then(data => this.handleResponse(data));

                            }}/>
                        </Segment>

                    </Segment.Group>

                </Container>
            </>
        );
    }
}

export default Conversation;
