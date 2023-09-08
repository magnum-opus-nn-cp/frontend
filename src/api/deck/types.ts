export enum EntityType {
  text = 'text', // +
  number = 'number', // +
  range = 'range', // +
  multiple_range = 'multiple_range', // +
  select = 'select', // +
  link = 'link', // + добавить валидацию
  date = 'date', // +
  // photo = 'photo',
  multiple_photo = 'multiple_photo',
  photo_description = 'photo_description',
  multiple_link_description = 'multiple_link_description', //
  multiple_photo_description = 'multiple_photo_description',
  // multiple_links = 'multiple_links', // не пригодилось
  multiple_date_description = 'multiple_date_description', //
  text_array = 'text_array', // используется только в подсказке
  cards = 'cards', // используется только в подсказке
}

export type PitchDeck = {
  id: number;
  name: string;
  description?: string;
  questions?: any[];
};

export type Hint = {
  type: EntityType;
  value: any;
}

export type Question = {
  id: number;
  text: string;
  type: EntityType;
  hint: Hint | false;
  next_id: number;
  params: { [key: string]: any } | null;
};

export type Answer = {
  answer: any;
  deck: number;
  question: number;
}