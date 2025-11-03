import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { DocumentApiService, DocumentModel } from '@data/rest/documents';
import { catchResolverError } from '@utils/helpers';
import { catchError, Observable } from 'rxjs';

export const documentResolver: ResolveFn<DocumentModel> = ({
  params,
}: ActivatedRouteSnapshot): Observable<DocumentModel> => {
  const api = inject(DocumentApiService);
  const router = inject(Router);

  return api.getItem(params['documentId']).pipe(catchResolverError(router));
};
