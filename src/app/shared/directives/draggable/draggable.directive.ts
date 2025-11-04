import {
  Directive,
  effect,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { DraggableHelperService } from '@shared/services';
import { PositionModel } from '@utils/models';
import { DraggableAreaDirective } from './draggable-area.directive';
import { clamp } from '@utils/helpers';

@Directive({
  selector: '[cwDraggable]',
  host: {
    '[style.pointer-events]': 'isDragging() ? "none" : null',
    '[style.position]': '"absolute"',
    '[style.top.px]': 'calcPosition().y',
    '[style.left.px]': 'calcPosition().x',
    '(mousedown)': 'moveStart($event)',
    '(document:mousemove.throttle~10ms)': 'move($any($event))',
    '(document:mouseup)': 'moveEnd()',
  },
})
export class DraggableDirective {
  private readonly service: DraggableHelperService = inject(DraggableHelperService);

  protected readonly area: DraggableAreaDirective = inject(DraggableAreaDirective);
  protected readonly lastEvent: WritableSignal<MouseEvent | null> = signal<MouseEvent | null>(null);
  protected readonly startPosition: WritableSignal<PositionModel> = signal({ x: 0, y: 0 });
  protected readonly calcPosition: WritableSignal<PositionModel> = signal({ x: 0, y: 0 });
  protected readonly isDragging: WritableSignal<boolean> = signal<boolean>(false);

  public readonly initialPosition: InputSignal<PositionModel> = input<PositionModel>(
    { x: 0, y: 0 },
    { alias: 'cwDraggable' },
  );
  public readonly positionChange: OutputEmitterRef<PositionModel> = output<PositionModel>();

  constructor() {
    effect((): void => {
      this.calcPosition.set(this.initialPosition());
    });

    effect(() => {
      const isScrolling = this.service.isScrolling();
      const event = this.lastEvent();
      if (isScrolling && event) {
        this.move(event);
      }
    });
  }

  protected moveStart(event: MouseEvent): void {
    this.isDragging.set(true);
    this.startPosition.set(this.service.getEventOffsetPosition(event, this.calcPosition()));
    this.lastEvent.set(event);
    event.preventDefault();
  }

  protected move(event: MouseEvent): void {
    if (!this.isDragging()) {
      return;
    }

    this.lastEvent.set(event);

    const { x, y } = this.service.getEventOffsetPosition(event, this.startPosition());

    this.calcPosition.set({
      x: clamp(x, 0, this.area.width),
      y: clamp(y, 0, this.area.height),
    });
  }

  protected moveEnd(): void {
    this.isDragging.set(false);
    this.lastEvent.set(null);
    this.positionChange.emit(this.calcPosition());
  }
}
