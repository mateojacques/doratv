import React, { useEffect, useRef, useContext } from "react";
import { TvContext } from "../../contexts/tvContext";
import { useMutationObserver } from "rooks";
import { Grid, Typography } from "@mui/material";
import { Icon } from "@mui/material";
import { TvOff } from "@mui/icons-material";
import { PARENT_DOMAINS_QUERY } from "../../utils/constants";

const Tv = () => {
  const { getActiveStream, setActiveStream } = useContext(TvContext);
  const stream = getActiveStream();

  const { user_login: active_channel = "" } = stream || {};

  //  TODO resolve on automation of streams flow (DTV-12)
  const tv = useRef(null);
  const tvMutationCallback = () => console.log("changes in tv");
  useMutationObserver(tv, tvMutationCallback);

  useEffect(() => {
    if (stream) setActiveStream(Number(stream?.id));
  }, [stream]);

  return (
    <>
      {active_channel ? (
        <iframe
          ref={tv}
          title="tv"
          id="tv"
          src={`https://player.twitch.tv/?channel=${active_channel}${PARENT_DOMAINS_QUERY}`}
          frameBorder="0"
          allowFullScreen={true}
          scrolling="no"
        />
      ) : (
        <Grid
          container
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="auto"
          sx={{ gap: 3 }}
        >
          <Icon component="div" sx={{ fontSize: "8rem" }}>
            <TvOff htmlColor="var(--muted-text)" fontSize="inherit" />
          </Icon>
          <Typography variant="body1" sx={{ color: "var(--primary-text)" }}>
            No stream selected. Try changing your{" "}
            <span style={{ color: "var(--secondary-color)" }}>filters</span> if
            no streams are found.
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default Tv;
