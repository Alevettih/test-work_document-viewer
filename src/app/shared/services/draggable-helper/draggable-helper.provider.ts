import { Provider } from '@angular/core';
import { DraggableHelperService } from './draggable-helper.service';

export function provideDraggableHelperService(): Provider[] {
  return [DraggableHelperService];
}
