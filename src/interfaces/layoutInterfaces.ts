export type TView = "live" | "on_demand";
export type TPanelView = "streams" | "chat" | "filter";

export interface ILogo {
  color: string;
}

export interface IHeader {
  setShowModal(showModal: boolean): void;
}

export interface IModalBase {
  showModal: boolean;
  setShowModal(showModal: boolean): void;
  children: any;
}

export interface IModalMessage {
  showModal: boolean;
  setShowModal(showModal: boolean): void;
  message: string;
  title: string;
}

export interface INavbar {
  view: TView;
  handleViewChange(e:any, view: TView): void;
}
