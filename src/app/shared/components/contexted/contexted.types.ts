export interface ContextMenuItem {
  id: string;
  icon: string;
  label: string;
}

export interface ItemSelectedEvent {
  item: ContextMenuItem;
  event: PointerEvent;
}
