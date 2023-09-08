import { EntityType, Question } from '../../../api/deck';

export const generateFieldsForFileAnswers = (question: Question, data: any) => {
  switch (question.type) {
    case EntityType.photo_description:
      return {
        file: data.value.file
      };
    case EntityType.multiple_photo:
      return data.value;
    case EntityType.multiple_photo_description:
      // eslint-disable-next-line no-case-declarations
      const files: any = {};
      data.value.forEach((i: any, index: number) => {
        files[`file_${index + 1}`] = i.file;
      });
      return files;
    default:
      return undefined;
  }
};
