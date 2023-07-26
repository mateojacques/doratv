import React, { createContext, useState, useEffect } from "react";
import { MAX_PANEL_STREAMS } from "../utils/constants";
import useAxios from "../customHooks/useAxios";
import config from "../config/config";
import {
  IFetchStreamsResponseData,
  IStream,
  ITvContext,
} from "../interfaces/liveInterfaces";
import { IGame } from "../interfaces/categoryInterfaces";

const { TWITCH_API_BASE_URL } = config;

export const TvContext = createContext({} as ITvContext);

const TvContextProvider = ({ children }: { children: any }) => {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [activeStream, setActiveStream] = useState<number>(0);
  const [activeGame, setActiveGame] = useState<IGame | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [currentQuantity, setCurrentQuantity] =
    useState<number>(MAX_PANEL_STREAMS);

  const {
    response: streamsResponse,
    error: streamsError,
    loading: streamsLoading,
    fetchData: fetchStreamsData,
  }: IFetchStreamsResponseData = useAxios();
  const { data: streamsResponseData } = streamsResponse || {};

  function fetchStreams(
    streamsQuantity = MAX_PANEL_STREAMS,
    scrollToBottom = false,
    currentList?: any
  ) {
    fetchStreamsData({
      baseUrl: TWITCH_API_BASE_URL,
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

  function getActiveStream() {
    return streams.find(({ id }) => Number(id) === activeStream) || streams[0];
  }

  useEffect(() => {
    if (streamsResponseData) setStreams(streamsResponseData);
  }, [streamsResponseData]);

  useEffect(() => {
    fetchStreams(currentQuantity, false);
  }, [activeStream, activeGame, activeLanguage]);

  return (
    <TvContext.Provider
      value={{
        streams,
        fetchStreams,
        getActiveStream,
        activeStream,
        setActiveStream,
        streamsLoading,
        streamsError,
        activeGame,
        setActiveGame,
        activeLanguage,
        setActiveLanguage,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};

export default TvContextProvider;
