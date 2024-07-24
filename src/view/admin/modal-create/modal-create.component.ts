import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemsService } from 'src/service/items.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent {
  ObjectForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ModalCreateComponent>,
      private service: ItemsService,
      private http: HttpClient 
    ) {
      this.ObjectForm = this.fb.group({
        name: [''],
        description: [''],
        customer: [''],
        price: [''],
        stock: [''],
        img: ['']
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
            this.ObjectForm.patchValue({ img: imageUrl });
          },
          (error) => {
            console.error('Error uploading image to imgbb:', error);
          }
        );
      }
    }
  
    addObject(){
      if (this.ObjectForm.valid) {
        this.service.createObject(this.ObjectForm.value).subscribe(
          (response) => {
            console.log('Object added successfully', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  
  
    cancel() {
      this.dialogRef.close(false);
    }
}
