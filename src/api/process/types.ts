export type TextDescriptor = {
  score: string;
  text: string;
};

export type ProcessDescriptor = {
  texts: TextDescriptor[];
  done: number;
  count: number;
};
