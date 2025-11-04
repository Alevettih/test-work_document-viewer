import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { DocumentApiService, DocumentModel } from '@data/rest/documents';
import { catchResolverError } from '@utils/helpers';
import { Observable } from 'rxjs';

export const documentResolver: ResolveFn<DocumentModel> = ({
  params,
}: ActivatedRouteSnapshot): Observable<DocumentModel> => {
  const api: DocumentApiService = inject(DocumentApiService);
  const router: Router = inject(Router);

  return api.getItem(params['documentId']).pipe(catchResolverError(router));
};
