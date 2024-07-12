import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from 'src/service/items.service';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {
  base64Image: string | null = null;

  ObjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ItemsService
  ) {
    this.ObjectForm = this.fb.group({
      elementid: [data.Object.id],
      elementobjectid: { value: data.Object.objectId, disabled: true },
      elementTittle: [data.Object.name],
      elementDescription: [data.Object.description],
      elementCustomer: [data.Object.customer],
      elementPrice: [data.Object.price],
      elementStock: [data.Object.stock],
      elementImg: [data.Object.img]
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Image = reader.result as string;
        this.ObjectForm.patchValue({
          elementImg: this.base64Image
        });
      };
    }
  }

  updatebject() {
    const updatedObj = {
      id: this.ObjectForm.getRawValue().elementid,
      objectId: this.ObjectForm.getRawValue().elementobjectid,
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
