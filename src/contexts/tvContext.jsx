import React, { createContext, useState, useEffect } from "react";
import {
  DEFAULT_LANGUAGE,
  MAX_PANEL_STREAMS,
} from "../utils/constants";
import useAxios from "../customHooks/useAxios.ts";

export const TvContext = createContext({});

const TvContextProvider = ({ children }) => {
  const [streams, setStreams] = useState([]);
  const [activeStream, setActiveStream] = useState(0);
  const [activeGame, setActiveGame] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState(DEFAULT_LANGUAGE);
  const [currentQuantity, setCurrentQuantity] = useState(MAX_PANEL_STREAMS);

  // Fetch streams

  const {
    response: streamsResponse,
    error: streamsError,
    loading: streamsLoading,
    fetchData: fetchStreamsData,
  } = useAxios();
  const { data: streamsResponseData } = streamsResponse || {};

  function fetchStreams(
    streamsQuantity = MAX_PANEL_STREAMS,
    scrollToBottom = false,
    currentList
  ) {
    fetchStreamsData({
      baseUrl: process.env.REACT_APP_TWITCH_API_BASE_URL,
      url: `streams?${
        activeGame ? `game_id=${activeGame.id}&` : ""
      }first=${streamsQuantity}${
        activeLanguage ? `&language=${activeLanguage}` : ""
      }`,
      method: "get",
    });

    setCurrentQuantity(streamsQuantity);

    if (currentList && scrollToBottom)
      setTimeout(() => {
        currentList.scroll(0, currentList.scrollHeight);
      }, 500);
  }

  function getActiveStreamById() {
    return streams.find((stream) => stream.id === activeStream) || streams[0];
  }

  const streamsProps = {
    streams,
    fetchStreams,
    getActiveStreamById,
    activeStream,
    setActiveStream,
    streamsLoading,
    streamsError,
    activeGame,
    setActiveGame,
    activeLanguage,
    setActiveLanguage,
  };

  useEffect(() => {
    if (streamsResponseData) setStreams(streamsResponseData);
  }, [streamsResponseData]);

  useEffect(() => {
    fetchStreams(currentQuantity, false);
  }, [activeStream, activeGame, activeLanguage]);

  // Filter search

  const {
    response: searchResponse,
    error: searchError,
    loading: searchLoading,
    fetchData: fetchSearchResults,
  } = useAxios();
  const { data: searchResults } = searchResponse || [];

  const searchProps = {
    searchResponse,
    searchResults,
    searchError,
    searchLoading,
    fetchSearchResults,
  };

  // Fetch game from Twitch

  const {
    response: twitchGame,
    error: twitchGameError,
    loading: twitchGameLoading,
    fetchData: fetchTwitchGame,
  } = useAxios();

  const twitchGameProps = {
    twitchGame,
    twitchGameError,
    twitchGameLoading,
    fetchTwitchGame,
  };

  return (
    <TvContext.Provider
      value={{
        ...streamsProps,
        ...searchProps,
        ...twitchGameProps,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;
