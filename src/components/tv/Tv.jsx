import React, { useEffect, useRef, useContext } from "react";
import { TvContext } from "../contexts/tvContext";
import { useMutationObserver } from "rooks";

const Tv = () => {
  const { getActiveStreamById, setActiveStream } = useContext(TvContext);
  const stream = getActiveStreamById();

  const { user_login: active_channel } = stream || {};
  const tv = useRef(null);

  const tvMutationCallback = () => console.log("changes in tv");

  useMutationObserver(tv, tvMutationCallback);

  useEffect(() => {
    if (stream) setActiveStream(stream.id);
  }, [stream]);

  return (
    <>
      {active_channel ? (
        <iframe
          ref={tv}
          title="tv"
          id="tv"
          src={`https://player.twitch.tv/?channel=${active_channel}&parent=localhost`}
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
