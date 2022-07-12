import { useState, useEffect, useRef, useContext } from "react";
import { TvContext } from "./components/contexts/tvContext";
import { Grid } from "@mui/material";
import { Tv, Panel, Header, Navbar, ModalMessage } from "./components";
import "./App.css";

function App() {
  const [view, setView] = useState("tv");
  const [showModal, setShowModal] = useState(false);

  const { setActiveGame } = useContext(TvContext);

  function handleViewChange(e, view) {
    setView(view);
  }

  useEffect(() => {
    const gameFromFilter = JSON.parse(localStorage.getItem("gameFromFilter"));
    setActiveGame(gameFromFilter);
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
        title="Lorem ipsum"
        message="Phasellus rhoncus sem ultrices lectus ultricies congue."
        size="12"
      />
    </div>
  );
}

export default App;
