import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { Serviceservice, ItemApi } from 'src/service/service.service';
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

  constructor(private apiService: Serviceservice, private router: Router, private cartservice: CartService) {}

  ngOnInit() {
    this.GetData();
  }
  
  GetData() {
    this.apiService.getObjects().subscribe(
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
  }

  addTocart(item: ItemApi) {
    this.cartservice.addToCart(item);
  }
  
}
