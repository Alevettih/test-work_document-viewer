import { EntityModel } from './entity.model';

export interface PageModel<T extends EntityModel> {
  content: T[];
  total: number;
}
