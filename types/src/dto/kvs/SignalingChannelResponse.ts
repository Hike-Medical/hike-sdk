export interface SignalingChannelResponse {
  channelARN: string;
  websocketUrl: string;
  assetId: string;
  footId: string;
  iceServers: IceServer[];
}

export interface IceServer {
  urls: string[];
  username?: string;
  credential?: string;
}
