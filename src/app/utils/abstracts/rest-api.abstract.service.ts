import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityModel, PageModel } from '@utils/models';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AbstractRestApiService<T extends EntityModel> {
  protected readonly http: HttpClient = inject(HttpClient);

  protected abstract readonly restApiUrl: string;

  public getItem(id: string): Observable<T> {
    return this.http.get<T>(`${this.restApiUrl}/${id}`);
  }

  public getPage(): Observable<PageModel<T>[]> {
    return this.http.get<PageModel<T>[]>(this.restApiUrl);
  }

  public create(data: T): Observable<T> {
    return this.http.post<T>(this.restApiUrl, data);
  }

  public edit(id: string, data: T): Observable<T> {
    return this.http.patch<T>(`${this.restApiUrl}/${id}`, data);
  }

  public replace(id: string, data: T): Observable<T> {
    return this.http.put<T>(`${this.restApiUrl}/${id}`, data);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.restApiUrl}/${id}`);
  }
}
