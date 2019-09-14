import React, {Component} from 'react';
import './App.css';
import Conversation from "./conversation/Conversation";
import WelcomeScreen from "./welcome/WelcomeScreen";
import MyHeader from "./conversation/components/MyHeader";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {showWelcomeScreen: true}
    }

    showChat = () => {
        this.setState({showWelcomeScreen: false})
    };

    render() {
        return (
            <div className="App">
                <MyHeader/>
                {this.state.showWelcomeScreen ? <WelcomeScreen showChat={() => this.showChat()}/> : <Conversation/>}
            </div>
        );
    }
}

export default App;
