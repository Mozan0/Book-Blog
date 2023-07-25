import { Component, Input } from '@angular/core';
import { Book } from './book.model';
import * as Bucket from '@spica-devkit/bucket';
import * as Storage from '@spica-devkit/storage';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  @Input() public books: Book[] = [];


  
  

  async ngOnInit() {
    Bucket.initialize({apikey :"cklbx019ljr002fa",publicUrl:"https://master.spicaengine.com/api"})
    Storage.initialize({apikey :"cklbx019ljr002fa",publicUrl:"https://master.spicaengine.com/api"})
    await this.getBooks();
  }

  async getBooks() {
    try{
      this.books = [];
      const data = await Bucket.data.getAll<Book>("64b91d543404ce002c98bf90");
      this.books.push(...data);
      console.log(this.books);
    }
    catch(err){
      console.log("Error getting data",err);
    }
  }

}
