import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService, ItemApi } from 'src/service/items.service';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from 'src/shared/shared.module';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, SharedModule]
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
    this.apiService.deleteObject(idItems).subscribe(
      (response) => {
        console.log('Task deleted successfully:', response);
        this.GetData();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    )
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
