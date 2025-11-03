import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { documentResolver } from './document.resolver';
import { DocumentModel } from '@data/rest/documents';

describe('documentResolver', () => {
  const executeResolver: ResolveFn<DocumentModel> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => documentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
