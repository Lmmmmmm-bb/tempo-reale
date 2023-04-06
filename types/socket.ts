export enum MessageTypeEnum {
  Offer = 'offer',
  Answer = 'answer',
  Candidate = 'candidate',
}

export interface OfferMessage {
  id: string;
  type: MessageTypeEnum.Offer;
  offer: RTCSessionDescriptionInit;
}

export interface AnswerMessage {
  id: string;
  type: MessageTypeEnum.Answer;
  answer: RTCSessionDescriptionInit;
}

export interface CandidateMessage {
  id: string;
  type: MessageTypeEnum.Candidate;
  candidate: RTCIceCandidateInit;
}

export type MessageBody = OfferMessage | AnswerMessage | CandidateMessage;
