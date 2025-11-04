import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'cw-zoom',
  imports: [TuiButton],
  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomComponent {
  protected readonly zoom: WritableSignal<number> = signal<number>(1);
  protected readonly isZoomInDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.zoom() >= this.max(),
  );
  protected readonly isZoomOutDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.zoom() <= this.min(),
  );

  public readonly zoomChange: OutputEmitterRef<number> = output<number>();
  public readonly min: Signal<number> = input<number>(0.25);
  public readonly max: Signal<number> = input<number>(2);
  public readonly step: Signal<number> = input<number>(0.125);

  protected zoomIn(): void {
    this.zoom.update((zoom: number): number => zoom + this.step());
    this.zoomChange.emit(this.zoom());
  }
  protected zoomOut(): void {
    this.zoom.update((zoom: number): number => zoom - this.step());
    this.zoomChange.emit(this.zoom());
  }
}
