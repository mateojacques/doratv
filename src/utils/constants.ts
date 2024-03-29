import config from "../config/config";

export const GET = "get";

export const MAX_PANEL_STREAMS = 20;
export const LOAD_MORE_STREAMS_STEP = 20;

export const MODAL_INFO_TITLE = "Welcome!";
export const MODAL_INFO_MESSAGE =
  "DoraTV is a custom Twitch client I made in order to explore and discover various streams related to the same game or activity. <br><br> <span style='color: var(--secondary-color);font-weight:700'>Working on multi stream view feature!</span>";

export const LIVE = "live";
export const ON_DEMAND = "on_demand";

export const STREAMS = "streams";
export const CHAT = "chat";
export const FILTER = "filter";

export const TABLET_MEDIA_QUERY = "(max-width: 768px)";

const { PARENT_DOMAINS } = config;

export const PARENT_DOMAINS_QUERY: string = PARENT_DOMAINS.map(
  (parent: string) => `&parent=${parent}`
)
  .join()
  .replaceAll(",", "");
