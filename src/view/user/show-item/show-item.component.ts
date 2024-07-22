import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService, ItemApi } from 'src/service/items.service';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css'],
})
export class ShowItemComponent implements OnInit {
  itemId!: number;
  item!: ItemApi;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.onRouteParamsChange(params));
  }

  //cambio de parametro en la ruta
  private onRouteParamsChange(params: any): void {
    this.itemId = +params['id'];
    this.fetchItemDetails(this.itemId);
  }

  //llamada al servicio itemsService para obtener info del item por su Id
  private fetchItemDetails(id: number): void {
    this.itemsService.getObjectById(id).subscribe(
      //se ejecuta cuando el observable emite un valor exitoso
      item => this.onItemLoadSuccess(item),
      error => this.onItemLoadError(error)
    );
  }

  private onItemLoadSuccess(item: ItemApi): void {
    this.item = item;
    console.log(this.item);
  }

  private onItemLoadError(error: any): void {
    console.error('Error fetching item details:', error);
  }

  addToCart(item: ItemApi): void {
    this.cartService.addToCart(item);
  }
}
