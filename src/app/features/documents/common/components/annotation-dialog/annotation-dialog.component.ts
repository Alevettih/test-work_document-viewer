import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DocumentAnnotationModel, DocumentAnnotationPositionModel } from '@data/rest/documents';
import { TuiButton, type TuiDialogContext, TuiError, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiFieldErrorPipe, TuiSelect, TuiSlider } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiForm } from '@taiga-ui/layout';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiDataListWrapper,
    TuiSelect,
    TuiSlider,
    TuiTextfield,
    TuiForm,
  ],
  templateUrl: './annotation-dialog.component.html',
  styleUrls: ['./annotation-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationDialogComponent {
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly context: TuiDialogContext<DocumentAnnotationModel, DocumentAnnotationModel> =
    injectContext<TuiDialogContext<DocumentAnnotationModel, DocumentAnnotationModel>>();

  protected readonly form: FormGroup = this.buildForm(this.data);
  protected readonly annotation: Signal<DocumentAnnotationModel | undefined> =
    toSignal<DocumentAnnotationModel>(this.form.valueChanges);
  protected readonly canSubmit: Signal<boolean> = computed<boolean>(
    (): boolean => Boolean(this.annotation()?.content) && this.form.valid,
  );

  protected get data(): DocumentAnnotationModel {
    return this.context.data;
  }

  protected submit(): void {
    if (this.canSubmit()) {
      this.context.completeWith(this.annotation()!);
    }
  }

  private buildForm({ id, content, position }: DocumentAnnotationModel): FormGroup {
    return this.fb.group<Record<keyof DocumentAnnotationModel, FormControl>>({
      id: this.fb.control<string>(id),
      content: this.fb.control<string>(content, [Validators.required]),
      position: this.fb.control<DocumentAnnotationPositionModel>(position),
    });
  }
}
