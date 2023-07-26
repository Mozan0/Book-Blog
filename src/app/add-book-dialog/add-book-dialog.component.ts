import { Component, EventEmitter, Inject, Output } from '@angular/core';
import * as Bucket from '@spica-devkit/bucket';
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
      this.selectedImage = selectedFile;

      // Read the file content and convert it to a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(selectedFile);
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
        image: this.imagePreview ? this.imagePreview.toString() : '', // Use the image data URL if available
      };

      await Bucket.data.insert('64b91d543404ce002c98bf90', newDocument);
      // await Storage.insert(newDocument.image);
    } catch (err) {
      console.log('Error adding product:', err);
    }
    this.dialogRef.close();
  }
}
