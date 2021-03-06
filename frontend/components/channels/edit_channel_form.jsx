import React from 'react';

class EditChannelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            server_id: null,
            id: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedChannel = Object.assign({}, this.state);
        this.props.editChannel(updatedChannel);
        this.props.closeModal();
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.deleteChannel(this.props.channelId)
        this.props.closeModal();
    }

    handleInput(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    componentDidMount() {
        if (this.props.channel) {
            this.setState({
                name: this.props.channel.name,
                server_id: this.props.serverId,
                id: this.props.channelId
            })
        }
    }

    render() {
        return(
            <div className="edit-channel-form">
                <h1>EDIT TEXT CHANNEL</h1>
                <h2 onClick={() => this.props.closeModal()}>X</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="channel-form-name">
                        <label>
                            <span>Channel Name</span>
                            <span className="channel-form-name-err">{}</span>
                            <input
                                type="text"
                                className="channel-form-input"
                                value={this.state.name}
                                onChange={this.handleInput('name')}
                            />
                        </label>
                    </div>
                    <div className="form-bottom">
                        <div className="channel-form-back">
                            <span 
                                className="channel-form-delete"
                                onClick={this.handleDelete}
                            >
                                Delete Channel
                            </span>
                        </div>
                        <button className="channel-form-submit">
                            Update Channel
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditChannelForm;