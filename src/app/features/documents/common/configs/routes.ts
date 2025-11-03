import { Routes } from '@angular/router';
import { documentResolver, provideDocumentApi } from '@data/rest/documents';
import { DocumentViewComponent } from '@features/documents/containers/document-view';

export const routes: Routes = [
  {
    path: 'view/:documentId',
    providers: [provideDocumentApi()],
    resolve: {
      document: documentResolver,
    },
    component: DocumentViewComponent,
  },
];
