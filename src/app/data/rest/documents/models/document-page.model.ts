import { DocumentAnnotationModel } from './document-annotation.model';

export interface DocumentPageModel {
  number: number;
  imageUrl: string;
  annotations?: DocumentAnnotationModel[];
}
