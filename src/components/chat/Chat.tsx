import React from "react";
import config from "../../config/config";
import { IChat } from "../../interfaces/liveInterfaces";

const { PARENT_DOMAIN } = config;

const Chat = ({ stream }: IChat) => (
  <div className="stream-chat-container">
    <iframe
      title={stream.user_login}
      className="stream-chat"
      src={`https://www.twitch.tv/embed/${stream.user_login}/chat?darkpopout&parent=${PARENT_DOMAIN}`}
      height="100%"
      width="100%"
    />
  </div>
);

export default Chat;
