export interface SignalingChannelResponse {
  channelARN: string;
  websocketUrl: string;
  assetId: string;
  iceServers: IceServer[];
}

export interface IceServer {
  urls: string[];
  username?: string;
  credential?: string;
}
