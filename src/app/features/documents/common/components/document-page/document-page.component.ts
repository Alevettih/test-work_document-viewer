import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { DocumentPageModel } from '@data/rest/documents';
import { TuiBadge, TuiBadgedContent } from '@taiga-ui/kit';
import { TuiCard } from '@taiga-ui/layout';

@Component({
  selector: 'cw-document-page',
  imports: [TuiCard, TuiBadge, TuiBadgedContent],
  templateUrl: './document-page.component.html',
  styleUrl: './document-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentPageComponent {
  public readonly page: InputSignal<DocumentPageModel> = input.required<DocumentPageModel>();
}
