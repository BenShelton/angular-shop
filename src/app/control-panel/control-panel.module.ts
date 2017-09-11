import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ControlPanelComponent } from './control-panel.component';

@NgModule({
  declarations: [
    ControlPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ControlPanelComponent
  ]
})
export class ControlPanelModule { }
