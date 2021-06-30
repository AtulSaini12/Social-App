import React from 'react';
import { connect } from 'react-redux';
import io from 'socket-io-client';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      typedMessage: '',
    };

    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.socket.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    socketConnection.on('connect', function () {
      console.log('CONNECTION ESTABLLISHED');

      socketConnection.emit('join_room', {
        user_email: self.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on('user_joined', function (data) {
        console.log('New User Joined the Party', data);
      });
    });

    socketConnection.on('receive_message', function (data) {
      const { messages } = self.state;
      const messageObject = {};

      messageObject.content = data.message;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };

  render() {
    const { messages, typedMessage } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
            alt="minimize-chat"
            height={17}
          />
        </div>
        {messages.map((message) => {
          <div
            className={
              message.self
                ? 'chat-messages self-chat'
                : 'chat-messages other-chat'
            }
          >
            <div className="chat-bubble">{message.content}</div>;
          </div>;
        })}
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => {
              this.setState({ typedMessage: e.target.value });
            }}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapUserToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapUserToProps)(Chat);
