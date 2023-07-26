import { IGame } from "./categoryInterfaces";

export interface IChat {
  stream: any;
}

// TODO enable this interface on filters refactor
/* export interface IAppliedFilters {
    game: boolean;
    language: boolean;
}
 */

export interface IStream {
  game_id: string;
  game_name: string;
  id: string;
  is_mature: boolean;
  language: string;
  started_at: Date;
  tag_ids: string[];
  tags: string[];
  thumbnail_url: string;
  title: string;
  type: string;
  user_id: string;
  user_login: string;
  user_name: string;
  viewer_count: number;
}

export interface IStreamBtn {
  stream: any;
  activeStream: boolean;
  setActiveStream(stream: any): void;
}

export interface IFetchStreamsResponseData {
  response: { data: IStream[] };
  error: Error;
  loading: boolean;
  fetchData({ baseUrl, url, method, body, customHeaders }: any): void;
}

export interface ITwitchCategory {
  box_art_url: string;
  id: string;
  name: string;
}

export interface ITwitchGame {
  box_art_url: string;
  id: string;
  igdb_id: string;
  name: string;
}

export interface IUseAxiosBaseData {
  error: any;
  loading: boolean;
  fetchData({ baseUrl, url, method, body, customHeaders }: any): void;
}

export interface ISearchCategoryRequest extends IUseAxiosBaseData {
  response: { data: ITwitchCategory[] };
}

export interface ISearchCategoryProps {
  searchResponse: {
    data: ITwitchCategory[];
  };
  searchResults: ITwitchCategory[];
  searchError: any;
  searchLoading: boolean;
  fetchSearchResults: ({
    baseUrl,
    url,
    method,
    body,
    customHeaders,
  }: any) => void;
}

export interface ITwitchGameRequest extends IUseAxiosBaseData {
  response: { data: ITwitchGame[] };
}

export interface ITwitchGameProps {
  twitchGame: {
    data: ITwitchGame[];
  };
  twitchGameError: any;
  twitchGameLoading: boolean;
  fetchTwitchGame: ({ baseUrl, url, method, body, customHeaders }: any) => void;
}

export interface ITvContext {
  streams: IStream[];
  fetchStreams(
    streamsQuantity: number,
    scrollToBottom: boolean,
    currentList?: any
  ): void;
  getActiveStream(): IStream;
  activeStream: number;
  setActiveStream(activeStream: number): void;
  streamsLoading: boolean;
  streamsError: Error;
  activeGame: IGame | null;
  setActiveGame(activeGame: IGame | null): void;
  activeLanguage: string | null;
  setActiveLanguage(activeLanguage: string | null): void;
}
