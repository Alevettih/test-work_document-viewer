import { Injectable, signal, WritableSignal } from '@angular/core';
import { PositionModel } from '@utils/models';

@Injectable()
export class DraggableHelperService {
  public readonly zoom: WritableSignal<number> = signal(1);
  public readonly scrollPosition: WritableSignal<PositionModel> = signal({ x: 0, y: 0 });
  public readonly isScrolling: WritableSignal<boolean> = signal<boolean>(false);

  public getEventOffsetPosition(event: MouseEvent, { x, y }: PositionModel): PositionModel {
    return {
      x: (event.clientX + this.scrollPosition().x) / this.zoom() - x,
      y: (event.clientY + this.scrollPosition().y) / this.zoom() - y,
    };
  }
}
