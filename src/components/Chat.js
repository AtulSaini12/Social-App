import React from 'react';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      typedMessage: '',
    };
  }

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
        <div
          className={
            messages.self
              ? 'chat-messages self-chat'
              : 'chat-messages other-chat'
          }
        >
          {messages.map((message) => {
            <div className="chat-bubble">{message.content}</div>;
          })}
        </div>
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
