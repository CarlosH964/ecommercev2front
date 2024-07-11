import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { Serviceservice, ItemApi } from 'src/service/service.service';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-show-item',
  standalone: true,
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css'],
  imports: [SharedModule, CommonModule]
})
export class ShowItemComponent implements OnInit {
  itemId!: number;
  item!: ItemApi;

  constructor(private route: ActivatedRoute, private apiservice: Serviceservice, private cartservice: CartService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
      this.fetchItemDetails(this.itemId);
    });
  }

  fetchItemDetails(id: number) {
    this.apiservice.getObjectById(id).subscribe(
      (data) => {
        this.item = data;
          console.log(this.item);
      },
      (error) => {
        console.error('Error fetching item details:', error);
      }
    );
  }

  addToCart(item: any) {
    this.cartservice.addToCart(item);
  }
}