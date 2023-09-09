export type ScoreType = 'bert' | 'f';

export type ScoreDescriptor = {
  [key in ScoreType]: {
    text: string;
    answer: string;
  };
};

export type TextDescriptor = {
  id: number;
  file_name: string;
  description:
    | {
        [key in ScoreType]?: {
          file?: string;
          pdf?: string;
          text: string;
        };
      }
    | null;
  text: string;
  summary: string;
  score: ScoreDescriptor;
};

export type ProcessDescriptor = {
  texts: TextDescriptor[];
  current: number;
  total: number;
};
