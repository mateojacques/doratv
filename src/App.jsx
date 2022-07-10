import { useState, useEffect, useRef } from "react";
import useAxios from "./customHooks/useAxios.ts";
import { MAX_PANEL_STREAMS, GAME_ID, LANGUAGE } from "./utils/constants";
import { Grid } from "@mui/material";
import { Tv, Panel, Header, Navbar, ModalMessage } from "./components";
import "./App.css";

function App() {
  const [streams, setStreams] = useState([]);
  const [activeStream, setActiveStream] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(MAX_PANEL_STREAMS);
  const [showModal, setShowModal] = useState(false);

  const [view, setView] = useState("tv");

  const streamList = useRef(null);
  const { current: currentList } = streamList || undefined;

  const { response, error, loading, fetchData } = useAxios();
  const { data, pagination } = response || {};
  const { cursor: currentPagination } = pagination || {};

  function fetchStreams(
    streamsQuantity = MAX_PANEL_STREAMS,
    scrollToBottom = false
  ) {
    fetchData({
      url: `streams?game_id=${GAME_ID}&first=${streamsQuantity}&language=${LANGUAGE}`,
      method: "get",
    });

    setCurrentQuantity(streamsQuantity);

    if (currentList && scrollToBottom)
      setTimeout(() => {
        currentList.scroll(0, currentList.scrollHeight);
      }, 500);
  }

  function handleViewChange(e, view) {
    setView(view);
  }

  function getActiveStreamById() {
    return streams.find((stream) => stream.id === activeStream) || streams[0];
  }

  useEffect(() => {
    if (data) setStreams(data);
  }, [data]);

  useEffect(() => {
    fetchStreams(currentQuantity, false);
  }, [activeStream]);

  return (
    <div className="App">
      <Grid component="main" container sx={{ flexWrap: "nowrap" }}>
        {view === "tv" && (
          <>
            <div className="left-container">
              <Header setShowModal={setShowModal} />
              <Tv
                stream={getActiveStreamById()}
                setActiveStream={setActiveStream}
              />
            </div>

            <Panel
              streams={streams}
              stream={getActiveStreamById()}
              activeStream={activeStream}
              streamList={streamList}
              setActiveStream={setActiveStream}
              fetchStreams={fetchStreams}
              currentPagination={currentPagination}
              loading={loading}
            />
          </>
        )}
      </Grid>

      <Navbar view={view} handleViewChange={handleViewChange} />

      <ModalMessage
        showModal={showModal}
        setShowModal={setShowModal}
        title="Lorem ipsum"
        message="Phasellus rhoncus sem ultrices lectus ultricies congue."
        size="12"
      />
    </div>
  );
}

export default App;
