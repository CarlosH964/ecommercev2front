import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from 'src/service/items.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {
  ObjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ItemsService,
    private http: HttpClient
  ) {
    this.ObjectForm = this.fb.group({
      elementid: [data.Object.idItems],
      elementTittle: [data.Object.name],
      elementDescription: [data.Object.description],
      elementCustomer: [data.Object.customer],
      elementPrice: [data.Object.price],
      elementStock: [data.Object.stock],
      elementImg: [data.Object.img]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const apiKey = environment.IMGBB_API_KEY;
      const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

      this.http.post(url, formData).subscribe(
        (response: any) => {
          const imageUrl = response.data.url;
          this.ObjectForm.patchValue({ elementImg: imageUrl });
        },
        (error) => {
          console.error('Error uploading image to imgbb:', error);
        }
      );
    }
  }

  updatebject() {
    const updatedObj = {
      idItems: this.ObjectForm.getRawValue().elementid,
      name: this.ObjectForm.value.elementTittle,
      description: this.ObjectForm.value.elementDescription,
      customer: this.ObjectForm.value.elementCustomer,
      price: this.ObjectForm.value.elementPrice,
      stock: this.ObjectForm.value.elementStock,
      img: this.ObjectForm.value.elementImg
    };

    console.log(updatedObj);

    this.service.updateObject(updatedObj).subscribe(
      (response) => {
        console.log('Object updated successfully', response);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error updating object:', error);
      }
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
