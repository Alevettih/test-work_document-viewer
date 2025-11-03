import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { TuiRoot, TuiTitle } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { RouterOutlet } from '@angular/router';
import { Theme, ThemeSwitcherComponent } from '@features/shell/common/components';

@Component({
  selector: 'cw-shell-layout',
  imports: [TuiRoot, TuiNavigation, TuiTitle, RouterOutlet, ThemeSwitcherComponent],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellLayoutComponent {
  protected readonly theme: WritableSignal<Theme | null> = signal<Theme | null>(null);
}
