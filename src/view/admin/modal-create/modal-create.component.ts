import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemsService } from 'src/service/items.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent {
  ObjectForm: FormGroup;
  base64Image: string | null = null;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ModalCreateComponent>,
      private service: ItemsService
    ) {
      this.ObjectForm = this.fb.group({
        objectId: [''],
        name: [''],
        description: [''],
        customer: [''],
        price: [''],
        stock: [''],
        img: ['']
      });
    }

    onFileChange(event: any) {
      const reader = new FileReader();
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.base64Image = reader.result as string;
          this.ObjectForm.patchValue({
            img: this.base64Image
          });
        };
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
