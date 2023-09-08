import { Answer, EntityType } from '../../../api/deck';
import { currencyFormatter, formatDate } from '../../../utils/fomat';
import { slugsForFormat } from '../components/ChatForm/components/ChatFormMultipleRange';

export const generateTextFromAnswer = (type: EntityType, answer: Answer, files?: { [key: string]: File }) => {
  switch (type) {
    case EntityType.text:
      return answer.answer;
    case EntityType.number:
      return answer.answer;
    case EntityType.date:
      return formatDate(answer.answer);
    case EntityType.link:
      return answer.answer;
    case EntityType.select:
      return answer.answer;
    case EntityType.multiple_range:
      return Object.entries(answer.answer)
        .map(([key, value]: any) => (slugsForFormat.includes(key) ? currencyFormatter.format(value) : value))
        .join('\n');
    case EntityType.multiple_date_description:
      return Object.entries(answer.answer)
        .map(([key, value]) => `${formatDate(new Date(key))}: ${value}`)
        .join('\n');
    case EntityType.range:
      // eslint-disable-next-line no-case-declarations
      const [slug, value]: any = Object.entries(answer.answer)[0];
      return slugsForFormat.includes(slug) ? currencyFormatter.format(value) : value;
    case EntityType.multiple_link_description:
      return Object.entries(answer.answer)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    case EntityType.photo_description:
      return `${answer.answer}\n${files?.file?.name}`;
    case EntityType.multiple_photo:
      return Object.values(files || {}).map((file) => `${file.name}`);
    case EntityType.multiple_photo_description:
      // eslint-disable-next-line no-case-declarations
      let result = '';
      answer.answer.forEach((desc: string, index: number, arr: any) => {
        result += files?.[`file_${index + 1}`].name + '\n';
        result += desc + (index !== arr.length - 1 ? '\n\n' : '');
      });
      return result;
    default:
      return '';
  }
};
