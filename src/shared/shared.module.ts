import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { featherShoppingBag, featherUser, featherBox, featherArrowLeftCircle } from '@ng-icons/feather-icons';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ featherBox, featherShoppingBag, featherUser, featherArrowLeftCircle }),
    MatMenuModule,
    MatButtonModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
