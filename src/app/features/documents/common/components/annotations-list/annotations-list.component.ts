import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { DocumentAnnotationModel, DocumentAnnotationPositionModel } from '@data/rest/documents';
import { AnnotationComponent, loadAnnotationDialog } from '@features/documents/common/components';
import { DraggableModule } from '@shared/directives';
import { ContextedComponent, ContextMenuItem, ItemSelectedEvent } from '@shared/components';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { getEventPosition } from '@utils/helpers';
import { filter } from 'rxjs';
import { menuItems } from './annotations-list.constants';

@Component({
  selector: 'cw-annotations-list',
  imports: [AnnotationComponent, DraggableModule, ContextedComponent],
  templateUrl: './annotations-list.component.html',
  styleUrl: './annotations-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationsListComponent {
  private readonly injector: Injector = inject<Injector>(Injector);
  private readonly dialogs: TuiDialogService = inject(TuiDialogService);

  public readonly annotations: InputSignal<DocumentAnnotationModel[]> =
    input.required<DocumentAnnotationModel[]>();
  public readonly annotationsChange: OutputEmitterRef<DocumentAnnotationModel[]> =
    output<DocumentAnnotationModel[]>();

  protected readonly menuItems: ContextMenuItem[] = menuItems;

  protected onContextItemSelected({ item, event }: ItemSelectedEvent): void {
    switch (item.id) {
      case 'add-annotation':
        this.onAddAnnotation(event);
    }
  }

  protected async onAddAnnotation(event: PointerEvent): Promise<void> {
    const dialog = await loadAnnotationDialog(this.injector, 'Создать аннотацию');

    dialog({
      id: Math.random().toString(16),
      content: '',
      position: getEventPosition(event),
    }).subscribe((annotation: DocumentAnnotationModel): void => {
      this.annotationsChange.emit([...this.annotations(), annotation]);
    });
  }

  protected async openEditAnnotationModal(data: DocumentAnnotationModel): Promise<void> {
    const dialog = await loadAnnotationDialog(this.injector, 'Редактировать аннотацию');

    dialog(data).subscribe((annotation: DocumentAnnotationModel): void =>
      this.editAnnotation(annotation),
    );
  }

  protected openDeleteAnnotationModal(data: DocumentAnnotationModel): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Вы уверены?',
        size: 's',
        required: true,
        data: {
          content: 'Удалив аннотацию, восстановить её будет невозможно!',
          yes: 'Да',
          no: 'Нет',
        },
      })
      .pipe(filter(Boolean))
      .subscribe(() => this.removeAnnotation(data));
  }

  protected onAnnotationPositionChange(
    annotation: DocumentAnnotationModel,
    position: DocumentAnnotationPositionModel,
  ): void {
    this.editAnnotation({ ...annotation, position });
  }

  protected editAnnotation(annotation: DocumentAnnotationModel): void {
    const index = this.findAnnotationIndex(annotation);

    if (index >= 0) {
      this.annotationsChange.emit(this.annotations().toSpliced(index, 1, annotation));
    }
  }

  protected removeAnnotation(annotation: DocumentAnnotationModel): void {
    const index = this.findAnnotationIndex(annotation);

    if (index >= 0) {
      this.annotationsChange.emit(this.annotations().toSpliced(index, 1));
    }
  }

  private findAnnotationIndex(annotation: DocumentAnnotationModel): number {
    return this.annotations().findIndex(
      ({ id }: DocumentAnnotationModel): boolean => annotation.id === id,
    );
  }
}
