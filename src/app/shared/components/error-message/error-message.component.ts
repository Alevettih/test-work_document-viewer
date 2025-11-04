import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { TuiBlockStatusComponent } from '@taiga-ui/layout';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'cw-error-message',
  imports: [TuiBlockStatusComponent, TuiIcon],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  public readonly heading: InputSignal<string> = input.required<string>();
  public readonly subheading: InputSignal<string> = input.required<string>();
  public readonly icon: InputSignal<string> = input<string>('@tui.triangle-alert');
}
