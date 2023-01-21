export interface IServer{
  listen: () => Promise<void>;
  close: () => Promise<void>;
}