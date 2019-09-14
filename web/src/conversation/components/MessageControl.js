import React, {Component} from 'react';

class MessageControl extends Component {
    render() {
        return (
            <div>

                <form>
                    <label>
                        Name:<input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default MessageControl;

