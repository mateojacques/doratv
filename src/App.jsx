import { useState, useEffect, useContext } from "react";
import { TvContext } from "./contexts/tvContext";
import { Grid } from "@mui/material";
import { Tv, Panel, Header, Navbar, ModalMessage } from "./components";
import {
  MODAL_INFO_MESSAGE,
  MODAL_INFO_TITLE,
} from "./utils/constants";
import "./App.css";
import { getDataFromLocalStorage } from "./utils/storage";

function App() {
  const [view, setView] = useState("tv");
  const [showModal, setShowModal] = useState(false);

  const { setActiveGame, setActiveLanguage } = useContext(TvContext);

  function handleViewChange(e, view) {
    setView(view);
  }

  useEffect(() => {
    const gameFromFilter = getDataFromLocalStorage("gameFromFilter", true);
    setActiveGame(gameFromFilter);

    const languageFromFilter =
      getDataFromLocalStorage("languageFromFilter");
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
        title={MODAL_INFO_TITLE}
        message={MODAL_INFO_MESSAGE}
        size="12"
      />
    </div>
  );
}

export default App;
