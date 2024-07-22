import { Component, OnInit, inject } from '@angular/core';
import { ItemsService, ItemApi } from 'src/service/items.service';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  element: ItemApi[] = [];

  constructor(private apiService: ItemsService) {}

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

  calculateTotal(item: ItemApi): number {
    return item.price * item.stock;
  }

  deleteObject(idItems: number): void {
    this.apiService.putIsDeleteObject(idItems).subscribe(
      () => {
        console.log('Item marked as deleted successfully.');
        this.GetData();
      },
      (error) => {
        console.error('Error marking item as deleted:', error);
      }
    );
  }

  //Modal

  readonly dialog = inject(MatDialog);

  openCreateDialog(): void{
    this.dialog.open(ModalCreateComponent,{
      width: 'fullscreen'
    }).afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.GetData();
      }
    });
  }

  openEditDialog(Object: ItemApi): void{
    const dialogedit = this.dialog.open(ModalEditComponent,{
      width: 'fullscreen',
      data: { Object: { ...Object } }
    });
    dialogedit.afterClosed().subscribe(result => {
      if (result) {
        this.GetData();
      }
    });
  }

}
