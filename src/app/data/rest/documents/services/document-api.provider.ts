import { Provider } from '@angular/core';
import { DocumentApiService } from './document-api.service';

export function provideDocumentApi(): Provider {
  return [DocumentApiService];
}
