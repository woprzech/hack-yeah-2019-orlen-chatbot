import React from "react";
import {Container, Image, Responsive} from "semantic-ui-react";
import WiliamsLogo from "../../wiliams_logo.png"
import OrlenLogo from "../../orlen_logo.png"

function MyHeader() {
    return (
        <div>
            <Container style={{paddingTop: '1.5em'}}>
                <Image verticalAlign='middle' floated='left' size='big' src={OrlenLogo} style={{marginRight: '1.5em'}}/>
                <Responsive minWidth={1220}>
                    <Image verticalAlign='middle' floated='right' size='medium' src={WiliamsLogo}
                           style={{marginRight: '1.5em'}}/>
                </Responsive>
            </Container>
        </div>
    );
}

export default MyHeader
