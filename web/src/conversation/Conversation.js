import React, {Component} from 'react';
import {Container, Segment} from "semantic-ui-react";
import MyMessage from "./components/MyMessage";
import MyHeader from "./components/MyHeader"
import InputControl from "./components/messagecontrol/InputControl";
import uuid from "uuid"
import RasaHttp from "../http/RasaHttp"

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
                {name: BOT_NAME, text: "asd asd asd asd a! asd asd  :", actor: ACTOR_BOT},
                {name: WORKER_NAME, text: "asd asd asd", actor: ACTOR_MAN},
            ]
        }
    }

    componentDidMount() {
        this.setState({generatedUserId: uuid.v1()});
    }

    renderMessage(message) {
        return (
            <MyMessage key={uuid.v1()}
                       text={message.text}
                       actor={message.actor}
                       name={message.name}/>
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
            <div>

                <MyHeader/>
                <Container>
                    <Segment.Group>
                        <Segment
                            className="conversation">{this.state.messages.map(message => this.renderMessage(message))}
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
            </div>
        );
    }
}

export default Conversation;
