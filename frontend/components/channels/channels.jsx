import React from 'react';
import Modal from '../modal';
import { Link } from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';
import MessagesContainer from '../messages/messages_container';
import ChannelItem from './channel_item';

class Channels extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        console.log('channels mounted')
        this.props.fetchAllServerInfo(this.props.serverId);
    };

    componentDidUpdate(prevProps) {
        console.log('channels updated')
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.fetchAllServerInfo(this.props.serverId);
        };
    };

    render() {
        console.log('channels rendered')
        let channel = this.props.channels;
        let channelId = this.props.channelId;
        let currentChannel = channel.channelId?.name;
        return (
            <>
                <div className="channels">
                    <div className="server-name-header">
                        <h1>{this.props.server.name}</h1>
                        <span>V</span>
                    </div>
                    <div className="line"></div>
                    <div className="channels-list">
                        <div className="text-channels">
                            <span>TEXT CHANNELS</span>
                            <span className="add-channel">+</span>
                        </div>
                        <div className="text-channels-list">
                            {this.props.channels.map( (channel, i) =>  (
                                <ChannelItem channel={channel} serverId={this.props.serverId} key={`channel-${i}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="top-nav-bar">
                    <div className="channel-name">
                        #{currentChannel}
                        </div>
                </div>

                <div className="channel-messages">   

                    <div className="messages">
                        <MessagesContainer />
                        <div className="users">
                            <div className="users-list">
                                    {this.props.users.map( (user, i) => (
                                        <div className="user" key={user.username}>{user.username}</div>
                                        ))}
                                    <div>{this.props.location.pathname}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};

export default Channels;