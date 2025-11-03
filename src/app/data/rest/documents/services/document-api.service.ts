import { Injectable } from '@angular/core';
import { AbstractRestApiService } from '@utils/abstracts';
import { DocumentModel } from '@data/rest/documents';

@Injectable()
export class DocumentApiService extends AbstractRestApiService<DocumentModel> {
  protected override readonly restApiUrl: string = '/api/documents';
}
