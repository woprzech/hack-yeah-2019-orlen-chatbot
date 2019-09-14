import React, {Component} from 'react';
import {Button, Container, Grid, Image} from "semantic-ui-react";
import Logo from "../orlen_logo_avatar.png";
import "./WelcomeScreen.css"

class WelcomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container>
                    <Grid centered columns={3}>
                        <Grid.Column className={"welcomeButton"}>
                            <Button onClick={() => this.props.showChat()}>
                                <Image verticalAlign='middle' size='medium' src={Logo} style={{marginRight: '1.5em'}}/>
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>);
    }
}

export default WelcomeScreen;