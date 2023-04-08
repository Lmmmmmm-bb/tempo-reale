export enum MessageTypeEnum {
  // internal
  Connection = 'connection',
  Disconnect = 'disconnect',

  All = 'all',
  Leave = 'leave',
  Offer = 'offer',
  Answer = 'answer',
  Candidate = 'candidate',
}

interface BaseMessage {
  from: string;
  to: string;
}

export interface OfferMessage extends BaseMessage {
  offer: RTCSessionDescriptionInit;
}

export interface AnswerMessage extends BaseMessage {
  answer: RTCSessionDescriptionInit;
}

export interface CandidateMessage extends BaseMessage {
  candidate: RTCIceCandidateInit;
}

export type MessageBody = OfferMessage | AnswerMessage | CandidateMessage;
