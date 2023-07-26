import React, { useState, useEffect, useContext } from "react";
import { TvContext } from "./contexts/tvContext";
import { Grid } from "@mui/material";
import { Tv, Panel, Header, Navbar, ModalMessage } from "./components";
import { LIVE, MODAL_INFO_MESSAGE, MODAL_INFO_TITLE } from "./utils/constants";
import "./App.css";
import { getDataFromLocalStorage } from "./utils/storage";
import { TView } from "./interfaces/layoutInterfaces";
import { IGame } from "./interfaces/categoryInterfaces";

function App() {
  const [view, setView] = useState<TView>(LIVE);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { setActiveGame, setActiveLanguage } = useContext(TvContext);

  function handleViewChange(e: any, view: TView) {
    setView(view);
  }

  useEffect(() => {
    const gameFromFilter: IGame | null = getDataFromLocalStorage(
      "gameFromFilter",
      true
    ) as IGame;
    setActiveGame(gameFromFilter);

    const languageFromFilter: string | null =
      getDataFromLocalStorage("languageFromFilter");
    setActiveLanguage(languageFromFilter);
  }, []);

  return (
    <div className="App">
      <Grid component="main" container sx={{ flexWrap: "nowrap" }}>
        {view === LIVE && (
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
      />
    </div>
  );
}

export default App;
