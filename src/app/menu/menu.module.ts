import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuViewComponent } from './menu-view/menu-view.component';
import { MatDialogModule} from "@angular/material/dialog";
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [
    MenuViewComponent, 
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatDialogModule
  ],
  entryComponents: [MenuViewComponent]
})
export class MenuModule { }
