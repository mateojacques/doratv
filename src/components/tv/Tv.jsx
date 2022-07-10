import React, { useEffect, useRef } from "react";
import { useMutationObserver } from "rooks";

const Tv = ({ stream, setActiveStream }) => {
  const { user_login } = stream || {};
  const tv = useRef(null);

  const demoCallback = () => console.log("this is callback");

  useMutationObserver(tv, demoCallback);

  useEffect(() => {
    if (stream) setActiveStream(stream.id);
  }, [stream]);

  return (
    <>
      {user_login ? (
        <iframe
          ref={tv}
          title="tv"
          id="tv"
          src={`https://player.twitch.tv/?channel=${user_login}&parent=localhost`}
          frameBorder="0"
          allowFullScreen={true}
          scrolling="no"
        ></iframe>
      ) : (
        ""
      )}
      {/* TODO Add Fallback */}
    </>
  );
};

export default Tv;
