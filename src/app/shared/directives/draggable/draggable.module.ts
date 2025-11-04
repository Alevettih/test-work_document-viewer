import { NgModule } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DraggableScrollerDirective } from './draggable-scroller.directive';
import { DraggableAreaDirective } from './draggable-area.directive';

@NgModule({
  imports: [DraggableDirective, DraggableAreaDirective, DraggableScrollerDirective],
  exports: [DraggableDirective, DraggableAreaDirective, DraggableScrollerDirective],
})
export class DraggableModule {}
