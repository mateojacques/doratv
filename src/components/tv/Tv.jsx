import React from "react";

const Tv = ({ stream }) => {
  const { user_login } = stream || {};
  return (
    <iframe
      title="tv"
      id="tv"
      src={`https://player.twitch.tv/?channel=${user_login}&parent=localhost&autoplay=false`}
      frameBorder="0"
      allowFullScreen={true}
      scrolling="no"
    ></iframe>
  );
};

export default Tv;
