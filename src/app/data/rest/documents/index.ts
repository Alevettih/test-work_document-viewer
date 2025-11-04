export {
  type DocumentAnnotationModel,
  type DocumentAnnotationPositionModel,
} from './models/document-annotation.model';
export { type DocumentModel } from './models/document.model';
export { type DocumentPageModel } from './models/document-page.model';

export { documentResolver } from './resolvers/document.resolver';

export { DocumentApiService } from './services/document-api.service';
export { provideDocumentApi } from './services/document-api.provider';
