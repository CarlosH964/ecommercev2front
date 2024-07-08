import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import { featherShoppingBag, featherUser, featherBox } from '@ng-icons/feather-icons';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ featherBox, featherShoppingBag, featherUser }),
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
