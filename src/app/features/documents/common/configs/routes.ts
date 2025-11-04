import { Routes } from '@angular/router';
import { documentResolver, provideDocumentApi } from '@data/rest/documents';
import { DocumentViewComponent } from '@features/documents/containers/document-view';
import { provideDraggableHelperService } from '@shared/services';

export const routes: Routes = [
  {
    path: 'view/:documentId',
    providers: [provideDocumentApi(), provideDraggableHelperService()],
    resolve: {
      document: documentResolver,
    },
    component: DocumentViewComponent,
  },
];
