import { PositionModel } from '@utils/models';

export function getEventPosition(event: PointerEvent): PositionModel {
  const target = event.target as HTMLElement;
  const rect: DOMRect = target.getBoundingClientRect();

  const scaleX = rect.width / target.offsetWidth;
  const scaleY = rect.height / target.offsetHeight;

  return {
    x: (event.clientX - rect.left) / scaleX,
    y: (event.clientY - rect.top) / scaleY,
  };
}
