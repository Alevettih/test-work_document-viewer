import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarLeftDirective } from './directives/toolbar-left.directive';
import { ToolbarRightDirective } from './directives/toolbar-right.directive';

@NgModule({
  imports: [ToolbarComponent, ToolbarLeftDirective, ToolbarRightDirective],
  exports: [ToolbarComponent, ToolbarLeftDirective, ToolbarRightDirective],
})
export class ToolbarModule {}
