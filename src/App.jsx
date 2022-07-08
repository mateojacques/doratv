import { useState, useEffect, useRef } from "react";
import useAxios from "./customHooks/useAxios.ts";
import { MAX_PANEL_STREAMS, GAME_ID } from "./utils/constants";
import { Tv, Panel, Header, Navbar } from "./components";
import "./App.css";

function App() {
  const [streams, setStreams] = useState([]);
  const [activeStream, setActiveStream] = useState(0);

  const [view, setView] = useState(0);

  const streamList = useRef(null);
  const { current: currentList } = streamList || undefined;

  const { response, error, loading, fetchData } = useAxios();
  const { data, pagination } = response || {};
  const { cursor: currentPagination } = pagination || {};

  function fetchStreams(cursor, target) {
    fetchData({
      url: `streams?game_id=${GAME_ID}&first=${MAX_PANEL_STREAMS}${
        cursor && target ? `&${target}=${cursor}` : ""
      }`,
      method: "get",
    });

    if (currentList) currentList.scroll(0, 0);
  }

  function handleViewChange(e, view) {
    setView(view);
  }

  useEffect(() => {
    if (data) setStreams(data);
  }, [data]);

  useEffect(() => {
    fetchStreams();
  }, []);

  return (
    <div className="App">
      <main>
        <div className="left-container">
          <Header />
          <Tv stream={streams[activeStream]} />
        </div>

        <Panel
          streams={streams}
          activeStream={activeStream}
          streamList={streamList}
          setActiveStream={setActiveStream}
          fetchStreams={fetchStreams}
          currentPagination={currentPagination}
        />
      </main>

      <Navbar view={view} handleViewChange={handleViewChange} />
    </div>
  );
}

export default App;
