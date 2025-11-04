import { Directive, inject } from '@angular/core';
import { DraggableHelperService } from '@shared/services';

@Directive({
  selector: '[cwDraggableScroller]',
  host: {
    '(scroll)': 'onScroll($event)',
    '(scrollend)': 'onScrollEnd()',
  },
})
export class DraggableScrollerDirective {
  private readonly service: DraggableHelperService = inject(DraggableHelperService);

  protected onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.service.scrollPosition.set({ x: target.scrollLeft, y: target.scrollTop });
    this.service.isScrolling.set(true);
  }

  protected onScrollEnd(): void {
    this.service.isScrolling.set(false);
  }
}
