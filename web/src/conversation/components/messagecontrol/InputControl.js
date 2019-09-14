import React, {Component} from 'react';
import {Button, Icon, Input} from "semantic-ui-react";
import "./InputControl.css"

class InputControl extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ""}
    }

    handleMessage = e => this.setState({text: e.target.value});

    sendMessage = () => {
        if (this.state.text !== "") {
            this.props.onButtonClick(this.state.text);
            this.setState({text: ""});
        }
    };

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            if (this.state.text !== "") {
                this.sendMessage()
            }
        }
    };

    render() {
        return (
            <div>
                <Input focus
                       action={
                           <Button animated
                                   onClick={this.sendMessage}
                                   disabled={this.state.text === ""}>
                               <Button.Content visible>Ask!</Button.Content>
                               <Button.Content hidden>
                                   <Icon name='arrow right'/>
                               </Button.Content>
                           </Button>}
                       onKeyDown={this.handleKeyDown}
                       placeholder='Any question ?'
                       onChange={this.handleMessage}
                       value={this.state.text}/>
            </div>
        );
    }
}

export default InputControl;

