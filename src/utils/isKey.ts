import { Key } from 'ts-key-enum';

export const isKey = (e: KeyboardEvent, key: Key | string | (Key | string)[]) => {
  const keyArr = Array.isArray(key) ? key : [key];

  return keyArr.some((key) => e.key === key);
};
