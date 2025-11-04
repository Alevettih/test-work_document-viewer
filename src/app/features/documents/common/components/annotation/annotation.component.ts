import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { DocumentAnnotationModel } from '@data/rest/documents';
import { TuiButton, TuiHint, TuiScrollbar } from '@taiga-ui/core';
import { TuiPulse } from '@taiga-ui/kit';
import { TuiCard } from '@taiga-ui/layout';

@Component({
  selector: 'cw-annotation',
  imports: [TuiPulse, TuiButton, TuiHint, TuiScrollbar, TuiCard],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.position]': '"absolute"',
    '[style.left.px]': 'annotation().position.x',
    '[style.top.px]': 'annotation().position.y',
  },
})
export class AnnotationComponent {
  protected readonly expanded: WritableSignal<boolean> = signal<boolean>(false);

  public readonly annotation: InputSignal<DocumentAnnotationModel> =
    input.required<DocumentAnnotationModel>();
  public readonly edit: OutputEmitterRef<DocumentAnnotationModel> =
    output<DocumentAnnotationModel>();
  public readonly remove: OutputEmitterRef<DocumentAnnotationModel> =
    output<DocumentAnnotationModel>();
}
