import React from "react";
import {Header, Segment} from "semantic-ui-react";
import Logo from "../../logo_orlen.jpg"

function MyHeader() {
    return (
        <Segment clearing>
            <Header as='h2' floated='right'>
                <img src={Logo} alt="Orlen"/>
            </Header>
            <Header as='h2' floated='left'>
                // todo
            </Header>
        </Segment>
    );
}

export default MyHeader
