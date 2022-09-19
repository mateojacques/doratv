import { useState, useEffect, useContext } from "react";
import { TvContext } from "./contexts/tvContext";
import { Grid } from "@mui/material";
import { Tv, Panel, Header, Navbar, ModalMessage } from "./components";
import { DEFAULT_GAME, DEFAULT_LANGUAGE } from "./utils/constants";
import "./App.css";

function App() {
  const [view, setView] = useState("tv");
  const [showModal, setShowModal] = useState(false);

  const { setActiveGame, setActiveLanguage } = useContext(TvContext);

  function handleViewChange(e, view) {
    setView(view);
  }

  useEffect(() => {
    const gameFromFilter =
      JSON.parse(localStorage.getItem("gameFromFilter")) || DEFAULT_GAME;
    setActiveGame(gameFromFilter);

    const languageFromFilter =
      localStorage.getItem("languageFromFilter") || DEFAULT_LANGUAGE;
    setActiveLanguage(languageFromFilter);
  }, []);

  return (
    <div className="App">
      <Grid component="main" container sx={{ flexWrap: "nowrap" }}>
        {view === "tv" && (
          <>
            <div className="left-container">
              <Header setShowModal={setShowModal} />
              <Tv />
            </div>

            <Panel />
          </>
        )}
      </Grid>

      <Navbar view={view} handleViewChange={handleViewChange} />

      <ModalMessage
        showModal={showModal}
        setShowModal={setShowModal}
        title="Welcome!"
        message="DoraTV is a custom Twitch client I made in order to explore and discover various streams related to the same game or activity. <br><br> Unfortunately, Twitch restricts a lot how the stream can be displayed on an external website, interrupting it every 10 minutes for 30 seconds, so if you are looking for a particular stream it's probably better to go to Twitch directly. <br><br>
        <span style='color: var(--secondary-color);font-weight:700'>Working on multi stream view feature!</span>"
        size="12"
      />
    </div>
  );
}

export default App;
