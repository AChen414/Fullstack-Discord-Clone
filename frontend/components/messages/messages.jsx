import React from 'react';

class Messages extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {
        return(
            <div className="message-box">
                <div className="message-list">
                    <div className="chat">

                        <div className="welcome">
                            <p>Welcome to </p>
                            <p>This is the start of your </p>
                        </div>

                    </div>
                </div>
            </div>
        )
    };
};

export default Messages;