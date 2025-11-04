import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { DocumentAnnotationModel, DocumentPageModel } from '@data/rest/documents';
import { TuiBadge, TuiBadgedContent } from '@taiga-ui/kit';
import { TuiCard } from '@taiga-ui/layout';
import { AnnotationsListComponent } from "../annotations-list/annotations-list.component";

@Component({
  selector: 'cw-document-page',
  imports: [TuiCard, TuiBadge, TuiBadgedContent, AnnotationsListComponent],
  templateUrl: './document-page.component.html',
  styleUrl: './document-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentPageComponent {
  public readonly page: InputSignal<DocumentPageModel> = input.required<DocumentPageModel>();
  public readonly pageChange: OutputEmitterRef<DocumentPageModel> = output<DocumentPageModel>();

  protected readonly annotations: Signal<DocumentAnnotationModel[]> = computed<
    DocumentAnnotationModel[]
    >((): DocumentAnnotationModel[] => this.page().annotations ?? []);

  protected onAnnotationsChange(annotations: DocumentAnnotationModel[]): void {
    this.pageChange.emit({
      ...this.page(),
      annotations: annotations,
    });
  }
}
