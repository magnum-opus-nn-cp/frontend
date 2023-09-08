export type TextDescriptor = {
  score: string;
  text: string;
};

export type ProcessDescriptor = {
  texts: TextDescriptor[];
  current: number;
  total: number;
};
