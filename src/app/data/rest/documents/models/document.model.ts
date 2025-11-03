import { EntityModel } from '@utils/models';
import { DocumentPageModel } from './page.model';

export interface DocumentModel extends EntityModel {
  name: string;
  pages: DocumentPageModel[];
}
