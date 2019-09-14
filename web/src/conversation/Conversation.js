import React, {Component} from 'react';
import {Container} from "semantic-ui-react";
import MyMessage from "./components/MyMessage";
import MyHeader from "./components/MyHeader"
import MessageControl from "./components/messagecontrol/MessageControl";
import uuid from "uuid"

export const WORKER_NAME = "Patryk Super Pracownik";
export const ACTOR_BOT = "BOT";
export const ACTOR_MAN = "MAN";
export const BOT_NAME = "Bot Orlen HR";

class Conversation extends Component {


    constructor(props) {
        super(props);
        this.state = {
            generatedUserId: "",
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
        console.log(data);
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
                <Container>
                    <MyHeader/>

                    <div
                        className="conversation">{
                        this.state.messages.map(message => this.renderMessage(message))}
                    </div>

                    <MessageControl
                        onButtonClick={(message) => {
                            this.setState({
                                messages: [...this.state.messages, {
                                    name: WORKER_NAME,
                                    text: message,
                                    actor: ACTOR_MAN
                                }]
                            });

                            console.log("http request: ", message);

                            fetch("http://88a8e5b8.ngrok.io/webhooks/rest/webhook", {
                                method: "POST", body: JSON.stringify({
                                    "message": message,
                                    "sender": this.state.generatedUserId
                                })
                            }).then(r => r.json()).then(data => this.handleResponse(data))
                        }}/>
                </Container>
            </div>
        );
    }
}

export default Conversation;
