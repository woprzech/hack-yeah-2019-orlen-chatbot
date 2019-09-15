import React, {Component} from 'react';
import {Container, Segment} from "semantic-ui-react";
import InputControl from "./components/messagecontrol/InputControl";
import uuid from "uuid"
import './Conversation.css';
import RasaHttp from "../http/RasaHttp"
import ButtonedMessage, {
    CALL_BUTTON_TYPE,
    LINK_BUTTON_TYPE,
    MESSAGE_BUTTON_TYPE
} from "./components/message/buttoned/ButtonedMessage";
import SingleMessage from "./components/message/single/SingleMessage";

export const WORKER_NAME = "Robert Kubica";
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
                        {text: "Multisport", redirectUrl: "https://kartamultisport.pl/", type: "LINK"},
                        {text: "Ok system", redirectUrl: "https://oksystem.pl/", type: "LINK"},
                        {text: "Be Active", redirectUrl: "https://ebeactive.pl/", type: "LINK"}
                    ]
                },
                {name: WORKER_NAME, text: "asd asd asd", actor: ACTOR_MAN},
                {
                    name: BOT_NAME,
                    text: "Nie mam pojęcia mordo, dźwoń! ",
                    actor: ACTOR_BOT,
                    buttons: [
                        {text: "Zadzwoń!", redirectUrl: "http://wp.pl/", type: "CALL"},
                    ]
                },
                {
                    name: BOT_NAME,
                    text: "Nie mam pojęcia mordo, dźwoń! ",
                    actor: ACTOR_BOT,
                    buttons: [
                        {text: "Cześć", redirectUrl: "http://wp.pl/", type: "MESSAGE"},
                    ]
                },
                {
                    name: BOT_NAME,
                    text: "Poniżej przedstawiam kwoty dofinansowania do wypoczynku dzieci w zależności od progu dochodu na członka rodziny:",
                    actor: ACTOR_BOT,
                    table: [{
                        columns: ["Próg", "Kwota dofinansowania"],
                        rows: [["do 1000", "300"], ["1001 - 2000", "200"]]
                    }
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        this.setState({generatedUserId: uuid.v1()});
    }

    renderMessage(message) {
        console.log(message);
        return (<div key={uuid.v1()}>{
                !message.buttons ?
                    <SingleMessage key={uuid.v1()}
                                   text={message.text}
                                   actor={message.actor}
                                   name={message.name}
                                   table={message.table}/> :
                    <ButtonedMessage key={uuid.v1()}
                                     text={message.text}
                                     actor={message.actor}
                                     name={message.name}
                                     buttons={message.buttons}
                                     onRedirectButtonClick={(text, url, type) => {
                                         if (type === LINK_BUTTON_TYPE) {
                                             window.open(url, "_blank")
                                         }
                                         if (type === CALL_BUTTON_TYPE) {
                                             window.open('tel:900300400')
                                         }
                                         if (type === MESSAGE_BUTTON_TYPE) {
                                             this.renderAndAsk(text);
                                             console.log("Asking about ", text)
                                         }
                                     }
                                     }/>

            }</div>
        );
    }

    renderAndAsk = (message) => {
        this.setState({
            messages: [...this.state.messages, {
                name: WORKER_NAME,
                text: message,
                actor: ACTOR_MAN
            }]
        });

        this.rasa.ask(message).then(data => this.handleResponse(data));
    };

    handleResponse = data => {
        this.setState({
            messages: [...this.state.messages, ...data.map(it => ({
                text: it.text,
                actor: ACTOR_BOT,
                name: BOT_NAME,
                buttons: it.buttons,
                table: it.table
            }))]
        })
    };

    render() {
        return (
            <>
                <Container className="app-container">
                    <Segment.Group className="app-segments">
                        <Segment className="conversation">
                            {this.state.messages.map(message => this.renderMessage(message))}
                        </Segment>

                        <Segment textAlign='right'>
                            <InputControl onButtonClick={(message) => this.renderAndAsk(message)}/>
                        </Segment>

                    </Segment.Group>
                </Container>
            </>
        );
    }
}

export default Conversation;
