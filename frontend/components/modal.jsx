import React from 'react';
import { connect } from 'react-redux';
import AddServerFormContainer from './servers/add_server_form_container';
import AddChannelFormContainer from './channels/add_channel_form_container';
import EditChannelFormContainer from './channels/edit_channel_form_container';
import EditMessageFormContainer from './messages/edit_message_form_container';
import InviteServerContainer from './servers/invite_server_container';
import JoinServerFormContainer from './servers/join_server_form_container';
import { closeModal } from '../actions/modal_actions';

const clearModalBackground = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}

const Modal = ({modal, closeModal}, props) => {
    if (!modal) {
        return null;
    };

    let component;
    switch(modal) {
        case 'Add Server':
            component = <AddServerFormContainer />;
            break;
        case 'Server Actions':
            component = <ServerActionsContainer />;
            break;
        case 'Add Channel':
            component = <AddChannelFormContainer />;
            break;
        case 'Edit Channel':
            component = <EditChannelFormContainer props={props}/>;
            break;
        case 'Edit Message':
            component = <EditMessageFormContainer props={props} />;
            break;
        case 'Invite Server':
            component = <InviteServerContainer props={props} />;
            break;
        case 'Join Server':
            component = <JoinServerFormContainer />;
            break;
        default:
            return null;
    };

    return(
        <div 
            className="modal-background" 
            onClick={() => closeModal()}
            style={ modal === 'Server Actions' ? clearModalBackground : {}}
        >
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
};

const mSTP = state => {
    return {
        modal: state.ui.modal
    };
};

const mDTP = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mSTP, mDTP)(Modal);