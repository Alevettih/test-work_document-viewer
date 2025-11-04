import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentModel, DocumentPageModel } from '@data/rest/documents';
import { DocumentPageComponent } from '@features/documents/common/components';
import { ErrorMessageComponent, ToolbarModule, ZoomComponent } from '@shared/components';
import { DraggableModule } from '@shared/directives';
import { DraggableHelperService } from '@shared/services';
import { TuiButton, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';

@Component({
  selector: 'cw-document-view',
  imports: [
    FormsModule,
    ErrorMessageComponent,
    ZoomComponent,
    DocumentPageComponent,
    ToolbarModule,
    TuiIcon,
    TuiInputNumber,
    TuiTextfield,
    TuiScrollbar,
    TuiButton,
    DraggableModule,
  ],
  templateUrl: './document-view.component.html',
  styleUrl: './document-view.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewComponent {
  private readonly draggableService: DraggableHelperService = inject(DraggableHelperService);

  protected readonly zoom: WritableSignal<number> = signal<number>(1);
  protected readonly pages: WritableSignal<DocumentPageModel[]> = signal<DocumentPageModel[]>([]);

  public readonly document: InputSignal<DocumentModel> = input.required<DocumentModel>();

  constructor() {
    effect((): void => {
      this.pages.set(
        this.document().pages.sort(
          (a: DocumentPageModel, b: DocumentPageModel): number => a.number - b.number,
        ),
      );
    });

    effect(() => {
      this.draggableService.zoom.set(this.zoom());
    });
  }

  protected onPageChange(page: DocumentPageModel): void {
    this.pages.update((pages: DocumentPageModel[]): DocumentPageModel[] => {
      return pages.toSpliced(page.number - 1, 1, page);
    });
  }

  protected onSave(): void {
    console.log({
      ...this.document(),
      pages: this.pages(),
    });
  }
}
