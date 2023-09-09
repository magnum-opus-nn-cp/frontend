import { RESPONSE_PAGE_PARAM, RESPONSE_PAGE_ROUTE, TEXT_PAGE_PARAM, TEXT_PAGE_ROUTE } from './routes';

export class PathBuilder {
  static getProcessPath = (id: string) => RESPONSE_PAGE_ROUTE.replace(`:${RESPONSE_PAGE_PARAM}`, String(id));
  static getTextPath = (id: number) => TEXT_PAGE_ROUTE.replace(`:${TEXT_PAGE_PARAM}`, String(id));
}
