import React, { useState, useRef } from "react";
import StreamBtn from "./StreamBtn";
import { Select, MenuItem, FormControl, Button } from "@mui/material";
import {
  KeyboardTab,
  FilterList,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import { Chat } from "../../components";

const Panel = ({
  streams,
  activeStream,
  streamList,
  setActiveStream,
  fetchStreams,
  currentPagination,
}) => {
  const [view, setView] = useState("schedule");

  const panel = useRef(null);
  const {current: currentPanel} = panel || {};

  return (
    <div className="panel" ref={panel}>
      <div className="panel-header">
        <Button className="toggle-collapse-btn" disableRipple onClick={() => panel.current.classList.toggle("panel-collapsed")}>
          <KeyboardTab htmlColor="#fff"/>
        </Button>

        <FormControl fullWidth className="select-panel-view-form">
          <Select
            id="select-panel-view"
            value={view}
            onChange={({ target }) => setView(target.value)}
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            <MenuItem defaultChecked value="schedule">
              Programación
            </MenuItem>
            <MenuItem value="chat">Chat</MenuItem>
          </Select>
        </FormControl>
        <Button className="filterBtn" disableRipple>
          <FilterList htmlColor="#fff" />
        </Button>
      </div>

      {view === "schedule" && (
        <>
          <div className="stream-list" ref={streamList}>
            {streams &&
              streams.map((stream, index) => (
                <StreamBtn
                  key={index}
                  stream={stream}
                  index={index}
                  activeStream={index === activeStream}
                  setActiveStream={setActiveStream}
                />
              ))}
          </div>

          <div className="pageChange">
            <Button
              className="prevPage"
              onClick={() => fetchStreams(currentPagination, "before")}
            >
              <ArrowBack htmlColor="#fff" />
            </Button>
            <Button
              className="nextPage"
              onClick={() => fetchStreams(currentPagination, "after")}
            >
              <ArrowForward htmlColor="#fff" />
            </Button>
          </div>
        </>
      )}

      {view === "chat" && <Chat stream={streams[activeStream]} />}
    </div>
  );
};

export default Panel;
