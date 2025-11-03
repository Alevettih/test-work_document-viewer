import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentModel, DocumentPageModel } from '@data/rest/documents';
import { DocumentPageComponent, ZoomControlComponent } from '@features/documents/common/components';
import { ErrorMessageComponent, ToolbarModule } from '@shared/components';
import { TuiButton, TuiIcon, TuiScrollbar } from '@taiga-ui/core';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';

@Component({
  selector: 'cw-document-view',
  imports: [
    FormsModule,
    ErrorMessageComponent,
    ZoomControlComponent,
    DocumentPageComponent,
    ToolbarModule,
    TuiIcon,
    TuiInputNumber,
    TuiTextfield,
    TuiScrollbar,
    TuiButton,
  ],
  templateUrl: './document-view.component.html',
  styleUrl: './document-view.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewComponent {
  protected readonly zoom: WritableSignal<number> = signal<number>(100);
  protected readonly pages: Signal<DocumentPageModel[]> = computed<DocumentPageModel[]>(
    (): DocumentPageModel[] => this.document().pages,
  );

  public readonly document: InputSignal<DocumentModel> = input.required<DocumentModel>();

  protected onSave(): void {
    console.log(this.document());
  }
}
