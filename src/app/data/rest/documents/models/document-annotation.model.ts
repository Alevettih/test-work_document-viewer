import { PositionModel } from '@utils/models';

export interface DocumentAnnotationModel {
  id: string;
  content: string;
  position: DocumentAnnotationPositionModel;
}

export interface DocumentAnnotationPositionModel extends PositionModel { }
