import { Injector } from '@angular/core';
import { DocumentAnnotationModel } from '@data/rest/documents';
import { tuiDialog } from '@taiga-ui/core';
import { Observable } from 'rxjs';

type AnntotationDialogFn = (
  data: DocumentAnnotationModel | null,
) => Observable<DocumentAnnotationModel>;

export async function loadAnnotationDialog(
  injector: Injector,
  label: string,
): Promise<AnntotationDialogFn> {
  const { AnnotationDialogComponent } = await import('./annotation-dialog.component');

  return tuiDialog(AnnotationDialogComponent, {
    injector: injector,
    dismissible: true,
    label,
    /**
     *  Какой-то косяк в генериках tuiDialog нельзя через генерики указать с какими данными будет работать диалог.
     *  Не получается перебить дефолт 2, 3, 4 аргумента (never, void, void)
     */
  }) as unknown as AnntotationDialogFn;
}
