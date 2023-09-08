import {EntityType, Question} from '../../../api/deck';

export const generateAnswerFromData = (question: Question, data: any) => {
  switch (question.type) {
    case EntityType.text:
      return data.value;
    case EntityType.number:
      return parseInt(data.value);
    case EntityType.date:
      return new Date(data.value).toISOString();
    case EntityType.link:
      return data.value;
    case EntityType.select:
      return data.value;
    case EntityType.multiple_range:
      return data.value;
    case EntityType.multiple_date_description:
      return data.value;
    case EntityType.range:
      return {
        [question.params!.slug]: data.value,
      };
    case EntityType.multiple_link_description:
      return data.value;
    case EntityType.photo_description:
      return JSON.stringify(data.value.text);
    case EntityType.multiple_photo:
      return '';
    case EntityType.multiple_photo_description:
      return JSON.stringify(data.value.map((i: any) => i.text));
    default:
      return '';
  }
}