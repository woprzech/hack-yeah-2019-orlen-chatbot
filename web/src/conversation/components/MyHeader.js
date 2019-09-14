import React from "react";
import {Container, Image, Menu} from "semantic-ui-react";
import Logo from "../../logo_orlen.jpg"

function MyHeader() {
    return (
        <div>
            <Container>
                {/*<Menu.Menu position='right'>*/}
                    <Image size='tiny' src={Logo} style={{marginRight: '1.5em'}}/>
                {/*</Menu.Menu>*/}
            </Container>
        </div>
    );
}

export default MyHeader
