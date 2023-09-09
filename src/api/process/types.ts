export type DetailFeatures = [answer: string, metric: number, texts: string[]];

export type DetailDescriptor = {
  text: string;
  features: DetailFeatures;
};

export type ScoreType = 'bert' | 'f' | 'nearest';

export type ScoreDescriptor = {
  [key in ScoreType]: {
    answer: string;
    metric?: number;
    // detailed?: DetailDescriptor[];
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
          text: string | DetailDescriptor[];
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
