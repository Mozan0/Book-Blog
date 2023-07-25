import { Component, EventEmitter, Inject, Output } from '@angular/core';
import * as Bucket from '@spica-devkit/bucket';
import * as Storage from '@spica-devkit/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})

export class AddBookDialogComponent {
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  @Output() photoSelected: EventEmitter<File> = new EventEmitter<File>();

  // Function to handle file selection
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files: FileList | null = inputElement?.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.photoSelected.emit(selectedFile);
    }
  }
  
  async addBooks() {
    
    try {
      const newDocument = {
        title: (<HTMLInputElement>document.getElementById('title')).value,
        description: (<HTMLInputElement>document.getElementById('description')).value,
        id: (<HTMLInputElement>document.getElementById('id')).value,
        price: Number((<HTMLInputElement>document.getElementById('price')).value),
        stock: Number((<HTMLInputElement>document.getElementById('stock')).value),
        image: (<HTMLInputElement>document.getElementById('image')).value, 
      };
    await Bucket.data.insert("64b91d543404ce002c98bf90", newDocument);
    } 
    catch (err) {
      console.log("Error adding product:", err);
    }
    this.dialogRef.close();
  }


}
