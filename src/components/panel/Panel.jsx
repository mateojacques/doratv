import React, { useState, useEffect, useContext, useRef } from "react";
import { Tooltip } from "@mui/material";
import StreamBtn from "./StreamBtn";
import {
  Select,
  MenuItem,
  FormControl,
  IconButton,
  CircularProgress,
  Icon
} from "@mui/material";
import { KeyboardTab, FilterList, ArrowDownward, SearchOff } from "@mui/icons-material";
import { Chat, Filter } from "../../components";
import { LOAD_MORE_STREAMS_STEP } from "../../utils/constants";
import { TvContext } from "../../contexts/tvContext";

const Panel = () => {
  const [view, setView] = useState("streams");
  const [filterOpened, setFilterOpened] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  const {
    streams,
    activeStream,
    setActiveStream,
    fetchStreams,
    loading,
    getActiveStreamById,
  } = useContext(TvContext);

  const { length: streamsQuantity } = streams || [];

  const streamList = useRef(null);
  const { current: currentList } = streamList || undefined;

  function toggleCollapsePanel() {
    setPanelCollapsed(!panelCollapsed);
  }

  function handleChangeView(targetView, previousView) {
    view === "filter" ? setView(previousView) : setView(targetView);
  }

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setPanelCollapsed(isMobile);
  }, []);

  return (
    <div className={`panel ${panelCollapsed && "panel-collapsed"}`}>
      <div className="panel-header">
        <Tooltip title={panelCollapsed ? "Expand" : "Collapse"}>
          <IconButton
            className="toggle-collapse-btn"
            onClick={() => toggleCollapsePanel()}
            disableRipple
          >
            <KeyboardTab htmlColor="var(--primary-text)" />
          </IconButton>
        </Tooltip>

        <FormControl fullWidth className="select-panel-view-form">
          <Select
            id="select-panel-view"
            value={view}
            onChange={({ target }) => handleChangeView(target.value, "streams")}
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            <MenuItem defaultChecked value="streams">
              Streams
            </MenuItem>
            <MenuItem value="chat">Chat</MenuItem>
            <MenuItem value="filter" sx={{ display: "none" }}>
              Filters
            </MenuItem>
          </Select>
        </FormControl>

        {view !== "chat" && (
          <Tooltip title="Filters">
            <IconButton
              className={`filterBtn ${filterOpened ? "filter-active" : ""}`}
              disableRipple
              onClick={() => setFilterOpened(!filterOpened)}
            >
              <FilterList htmlColor="var(--primary-text)" />
            </IconButton>
          </Tooltip>
        )}
      </div>

      {view === "streams" && (
        <>
          <div className="stream-list" ref={streamList}>
            {streams && streams.length > 0 ? (
              streams.map((stream, index) => (
                <StreamBtn
                  key={index}
                  stream={stream}
                  activeStream={stream.id === activeStream}
                  setActiveStream={setActiveStream}
                />
              ))
            ) : (
              <Icon component="div" sx={{ fontSize: "3rem", margin: "40px auto 0 auto" }}>
                <SearchOff htmlColor="var(--muted-text)" fontSize="inherit"/>
              </Icon>
            )}

            {streamsQuantity <= 100 - LOAD_MORE_STREAMS_STEP &&
              streamsQuantity >= LOAD_MORE_STREAMS_STEP && (
                <div className="pageChange">
                  <IconButton
                    className="load-more-btn"
                    onClick={() =>
                      fetchStreams(
                        streamsQuantity + LOAD_MORE_STREAMS_STEP,
                        false,
                        currentList
                      )
                    }
                  >
                    <ArrowDownward htmlColor="var(--primary-text)" />
                  </IconButton>
                </div>
              )}
          </div>

          {loading && (
            <div className="loader-container">
              <CircularProgress sx={{ color: "var(--secondary-color)" }} />
            </div>
          )}

          {filterOpened && <Filter className="panel-filter" />}
        </>
      )}

      {view === "chat" && streams.length > 0 && (
        <Chat stream={getActiveStreamById()} />
      )}
    </div>
  );
};

export default Panel;
