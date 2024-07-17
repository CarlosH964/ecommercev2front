import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { ItemsService, ItemApi } from 'src/service/items.service';
import { Router } from '@angular/router';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-shadow-user',
  standalone: true,
  templateUrl: './shadow-user.component.html',
  styleUrls: ['./shadow-user.component.css'],
  imports: [SharedModule, CommonModule]
})
export class ShadowUserComponent {

  element: ItemApi[] = [];

  constructor(private apiService: ItemsService, private router: Router, private cartservice: CartService) {}

  ngOnInit() {
    this.GetData();
  }
  
  GetData() {
    this.apiService.getObjectswithstock().subscribe(
      (data) => {
        this.element = data;
        console.log(this.element);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  itemnavigation(itemId: number) {
    this.router.navigate(['/home/item', itemId]);
    this.GetData();
  }

  addTocart(item: ItemApi) {
    this.cartservice.addToCart(item);
  }
  
}
