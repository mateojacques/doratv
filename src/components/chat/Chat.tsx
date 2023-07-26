import { IChat } from "../../interfaces/liveInterfaces";
import { PARENT_DOMAINS_QUERY } from "../../utils/constants";

const Chat = ({ stream }: IChat) => (
  <div className="stream-chat-container">
    <iframe
      title={stream.user_login}
      className="stream-chat"
      src={`https://www.twitch.tv/embed/${stream.user_login}/chat?darkpopout${PARENT_DOMAINS_QUERY}`}
      height="100%"
      width="100%"
    />
  </div>
);

export default Chat;
