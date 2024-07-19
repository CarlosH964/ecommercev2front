import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { ItemsService, ItemApi } from 'src/service/items.service';
import { Router } from '@angular/router';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-shadow-user',
  standalone: true,
  templateUrl: './shadow-user.component.html',
  styleUrls: ['./shadow-user.component.css'],
  imports: [SharedModule, CommonModule, FormsModule],  
})
export class ShadowUserComponent {
  items: ItemApi[] = [];
  filteredItems: ItemApi[] = [];
  searchTerm: string = '';

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private cartservice: CartService
  ) {}

  ngOnInit(): void {
    this.GetItems();
  }
  
  private GetItems(): void {
    this.itemsService.getObjectswithstock().subscribe(
      items => this.onItemsLoadSuccess(items),
      error => this.onItemsLoadError(error)
    );
  }

  private onItemsLoadSuccess(items: ItemApi[]): void {
    this.items = items;
    this.filteredItems = items;
  }

  private onItemsLoadError(error: any): void {
    console.error('Error fetching items:', error);
  }

  filterItems():void {
    this.filteredItems = this.searchTerm
    ? this.items.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    : this.items;
  }

  NavigationShowItem(itemId: number) {
    this.router.navigate(['/home/item', itemId]);
  }

  addItemTocart(item: ItemApi) {
    this.cartservice.addToCart(item);
  }
}
