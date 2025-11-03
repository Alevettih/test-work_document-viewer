import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EntityModel } from '@utils/models';
import { catchError, Observable } from 'rxjs';

export function catchResolverError<T extends EntityModel>(
  router: Router,
): (source$: Observable<T>) => Observable<T> {
  return (source$: Observable<T>): Observable<T> =>
    source$.pipe(
      catchError((error: HttpErrorResponse): never => {
        router.navigate(['', 'not-found']);

        throw error;
      }),
    );
}
