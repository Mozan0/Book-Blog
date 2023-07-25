import { Component } from '@angular/core';

import { Book } from './books/book.model'; // <-- Make sure this import is correct
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-blog';
  public books: Book[] = [];

  constructor(private dialog:MatDialog) {}

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent,{
      width: '700px',
      height: '850px'
    });
    dialogRef.afterClosed().subscribe(result => {
      // Optionally, you can handle data returned from the dialog
      // For example, you can add the book to the book list here.
    });
  }

  async ngOnInit() {
    // Initialize your data or perform other initialization tasks here
  }

  
}
