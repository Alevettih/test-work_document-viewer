import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { ContextMenuItem, ItemSelectedEvent } from './contexted.types';

@Component({
  selector: 'cw-contexted',
  imports: [TuiDropdown, TuiDataList, TuiIcon],
  templateUrl: './contexted.component.html',
  styleUrl: './contexted.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextedComponent {
  protected readonly lastContextEvent: WritableSignal<PointerEvent | null> = signal(null);

  public readonly menuItems: InputSignal<ContextMenuItem[]> = input.required<ContextMenuItem[]>();
  public readonly itemSelected: OutputEmitterRef<ItemSelectedEvent> = output<ItemSelectedEvent>();

  public onMenuItemClick(item: ContextMenuItem): void {
    this.itemSelected.emit({ item, event: this.lastContextEvent()! });
  }
}
