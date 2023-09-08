import {create} from 'zustand';

export enum ChatItemType {
  send = 'send',
  receive = 'receive'
}

export type ChatItem = {
  type: ChatItemType;
  text: string;
}

export interface ChatHistoryStore {
  history: ChatItem[];
  pushHistory: (item: ChatItem) => void;
}

export const useChatHistory = create<ChatHistoryStore>((set) => ({
  history: [],
  pushHistory: (item: ChatItem) => set((state) => ({ history: [...state.history, item] })),
}));