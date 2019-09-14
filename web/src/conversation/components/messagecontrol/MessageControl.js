import React, {Component} from 'react';
import {Input} from "semantic-ui-react";

class MessageControl extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ""}
    }

    handleMessage = e => this.setState({text: e.target.value});

    sendMessage = () => {
        this.props.onButtonClick(this.state.text);
        this.setState({text: ""});
        console.log(this.state.text)
    };

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.sendMessage()
        }
    };

    render() {
        return (
            <div>
                <Input focus
                       action={{
                           content: 'Ask!',
                           onClick: () => this.sendMessage()
                       }}
                       onKeyDown={this.handleKeyDown}
                       placeholder='Any question ?'
                       onChange={this.handleMessage}
                       value={this.state.text}/>
            </div>
        );
    }
}

export default MessageControl;

