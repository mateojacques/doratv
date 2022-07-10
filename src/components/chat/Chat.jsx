import React from "react";

const Chat = ({ stream }) => {
  return (
    <div className="stream-chat-container">
      <iframe
        title={stream.user_login}
        className="stream-chat"
        src={`https://www.twitch.tv/embed/${stream.user_login}/chat?darkpopout&parent=localhost`}
        height="100%"
        width="100%"
      ></iframe>
    </div>
  );
};

export default Chat;
