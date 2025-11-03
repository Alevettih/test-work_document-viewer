import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { Theme } from './theme-switcher.types';

@Component({
  selector: 'cw-theme-switcher',
  imports: [TuiButton],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  public readonly themeChange: OutputEmitterRef<Theme> = output<Theme>();
  public readonly theme: WritableSignal<Theme> = signal<Theme>(
    matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light',
  );

  constructor() {
    effect((): void => {
      this.themeChange.emit(this.theme());
    });
  }

  protected toggleTheme(value: Theme): void {
    const theme: Theme = value === 'dark' ? 'light' : 'dark';
    this.theme.set(theme);
  }
}
