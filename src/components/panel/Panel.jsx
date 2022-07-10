import React, { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import StreamBtn from "./StreamBtn";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  CircularProgress,
} from "@mui/material";
import { KeyboardTab, FilterList, ArrowDownward } from "@mui/icons-material";
import { Chat } from "../../components";
import { LOAD_MORE_STREAMS_STEP } from "../../utils/constants";

const Panel = ({
  streams,
  stream,
  activeStream,
  streamList,
  setActiveStream,
  fetchStreams,
  loading,
}) => {
  const [view, setView] = useState("schedule");
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  const { length: streamsQuantity } = streams || [];

  function toggleCollapsePanel() {
    setPanelCollapsed(!panelCollapsed);
  }

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    isMobile ? setPanelCollapsed(true) : setPanelCollapsed(false);
  }, []);

  return (
    <div className={`panel ${panelCollapsed && "panel-collapsed"}`}>
      <div className="panel-header">
        <Tooltip title={panelCollapsed ? "Expand" : "Collapse"}>
          <Button
            className="toggle-collapse-btn"
            disableRipple
            onClick={() => toggleCollapsePanel()}
          >
            <KeyboardTab htmlColor="var(--primary-text)" />
          </Button>
        </Tooltip>

        <FormControl fullWidth className="select-panel-view-form">
          <Select
            id="select-panel-view"
            value={view}
            onChange={({ target }) => setView(target.value)}
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            <MenuItem defaultChecked value="schedule">
              Streams
            </MenuItem>
            <MenuItem value="chat">Chat</MenuItem>
          </Select>
        </FormControl>

        <Tooltip title="Filter">
          <Button className="filterBtn" disableRipple>
            <FilterList htmlColor="var(--primary-text)" />
          </Button>
        </Tooltip>
      </div>

      {view === "schedule" && (
        <>
          <div className="stream-list" ref={streamList}>
            {streams &&
              streams.map((stream, index) => (
                <StreamBtn
                  key={index}
                  stream={stream}
                  activeStream={stream.id === activeStream}
                  setActiveStream={setActiveStream}
                />
              ))}

            {streamsQuantity <= 100 - LOAD_MORE_STREAMS_STEP &&
              streamsQuantity >= LOAD_MORE_STREAMS_STEP && (
                <div className="pageChange">
                  <Button
                    className="prevPage"
                    onClick={() =>
                      fetchStreams(
                        streamsQuantity + LOAD_MORE_STREAMS_STEP,
                        true
                      )
                    }
                  >
                    <ArrowDownward htmlColor="var(--primary-text)" />
                  </Button>
                </div>
              )}
          </div>

          {loading && (
            <div className="loader-container">
              <CircularProgress sx={{ color: "var(--secondary-color)" }} />
            </div>
          )}
        </>
      )}

      {view === "chat" && streams.length > 0 && <Chat stream={stream} />}
    </div>
  );
};

export default Panel;
