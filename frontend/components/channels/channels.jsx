import React from 'react';
import Modal from '../modal';
import { Link } from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';
import MessagesContainer from '../messages/messages_container';
import ChannelItem from './channel_item';

class Channels extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDropdown = this.toggleDropdown.bind(this);
    };

    toggleDropdown() {
        const dropDown = document.getElementsByClassName('server-options');
        if (dropDown[0].style.visibility === 'hidden') {
            dropDown[0].style.visibility = 'visible';
        } else {
            dropDown[0].style.visibility = 'hidden';
        }
    }

    deleteServer() {
        this.props.deleteServer(this.props.server.id)
            .then(() => this.props.history.push('/@me'))
            .then(() => location.reload());
    }

    componentDidMount() {
        this.props.fetchAllServerInfo(this.props.serverId);
    };

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.fetchAllServerInfo(this.props.serverId);
        };
    };

    render() {
        let channel = this.props.channels;
        let channelId = this.props.channelId;
        let currentChannel = channel[channelId]?.name;
        let serverDelete;
        if (this.props.currentUser.id === this.props.server.owner_id) {
            serverDelete = 
                <div className="server-delete" onClick={() => this.deleteServer()}>
                    <div className="delete-server">Delete Server</div>
                    <img src="https://the-cord-dev.s3-us-west-1.amazonaws.com/Red_X.svg"/>
                </div>
        }
        const serverInvite = 
            <div className="server-invite-code" onClick={() => dispatch(openModal('Invite Server', this.props.server))}>
                <div className="invite">Invite People</div>
                <div className="invite-icon">+</div>
            </div>
        
        return (
            <>
                <div className="channels">
                    <div className="server-name-header" onClick={this.toggleDropdown}>
                        <h1>{this.props.server.name}</h1>
                        <span>V</span>
                        <div className="server-options">
                            { serverInvite }
                            { serverDelete }
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="channels-list">
                        <div className="text-channels">
                            <span>TEXT CHANNELS</span>
                            <span className="add-channel" onClick={() => dispatch(openModal('Add Channel'))}>+</span>
                            <div className="channel-add-hover">Create Channel</div>
                        </div>
                        <div className="text-channels-list">
                            {this.props.channels.map( (channel, i) =>  (
                                <ChannelItem 
                                    channel={channel} 
                                    serverId={this.props.serverId} 
                                    server={this.props.server} 
                                    currentUser={this.props.currentUser}
                                    openModal={openModal}
                                    key={`channel-${i}`} 
                                />
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
                                <h1>Users</h1>
                                {this.props.users.map( (user, i) => (
                                    <div className="user" key={user.username}>{user.username}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal />
            </>
        );
    };
};

export default Channels;