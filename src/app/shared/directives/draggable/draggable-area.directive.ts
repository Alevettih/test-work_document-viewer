import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[cwDraggableArea]',
})
export class DraggableAreaDirective {
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  public get height(): number {
    return this.elementRef.nativeElement.offsetHeight;
  }

  public get width(): number {
    return this.elementRef.nativeElement.offsetWidth;
  }
}
