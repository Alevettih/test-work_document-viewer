import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  Signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { ToolbarLeftDirective } from './directives/toolbar-left.directive';
import { ToolbarRightDirective } from './directives/toolbar-right.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'cw-toolbar',
  imports: [TuiNavigation, NgTemplateOutlet],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  protected readonly leftGroup: Signal<TemplateRef<unknown> | undefined> = contentChild(
    ToolbarLeftDirective,
    {
      read: TemplateRef,
    },
  );
  protected readonly rightGroup: Signal<TemplateRef<unknown> | undefined> = contentChild(
    ToolbarRightDirective,
    { read: TemplateRef },
  );
}
