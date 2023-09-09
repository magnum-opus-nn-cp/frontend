import { TEXT_PAGE_PARAM, TEXT_PAGE_ROUTE } from './routes';

export class PathBuilder {
  static getTextPath = (id: number) => TEXT_PAGE_ROUTE.replace(`:${TEXT_PAGE_PARAM}`, String(id));
}
