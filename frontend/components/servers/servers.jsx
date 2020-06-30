import React from 'react'
import { Link } from 'react-router-dom';
import ServerItem from './server_item';
import Modal from '../modal';
import { openModal, closeModal } from '../../actions/modal_actions';

class Servers extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.fetchServers();
    }

    render() {
        const { servers } = this.props
        return(
            <div className="servers">
                <div className="server-buttons">
                    <div className="server-button">
                        <p>Home</p>
                    </div>
                    <div className="separator"></div>
                    <div className="servers-list">
                        <ul>
                            {servers.map( (server, i) => (
                                <ServerItem server={server} key={`server-${i}`} />
                            ))}
                        </ul>
                    </div>
                    <div className="separator"></div>
                    <div 
                        className="server-button"
                        onClick={() => dispatch(openModal('Add Server'))}
                        id="add-server-button"
                    >
                        +
                    </div>
                    <Modal />
                </div>
            </div>
        )
    };
};

export default Servers;