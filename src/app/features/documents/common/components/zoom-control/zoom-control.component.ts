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
  selector: 'cw-zoom-control',
  imports: [TuiButton],
  templateUrl: './zoom-control.component.html',
  styleUrl: './zoom-control.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomControlComponent {
  protected readonly zoom: WritableSignal<number> = signal<number>(100);
  protected readonly isZoomInDisabled: Signal<boolean> = computed<boolean>(
    () => this.zoom() >= this.max(),
  );
  protected readonly isZoomOutDisabled: Signal<boolean> = computed<boolean>(
    () => this.zoom() <= this.min(),
  );

  public readonly zoomChange: OutputEmitterRef<number> = output<number>();
  public readonly min: Signal<number> = input<number>(25);
  public readonly max: Signal<number> = input<number>(200);
  public readonly step: Signal<number> = input<number>(12.5);

  protected zoomIn(): void {
    this.zoom.update((zoom: number): number => zoom + this.step());
    this.zoomChange.emit(this.zoom());
  }
  protected zoomOut(): void {
    this.zoom.update((zoom: number): number => zoom - this.step());
    this.zoomChange.emit(this.zoom());
  }
}
