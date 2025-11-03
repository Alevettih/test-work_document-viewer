import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorMessageComponent } from '@shared/components';

@Component({
  selector: 'cw-not-found',
  imports: [ErrorMessageComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
