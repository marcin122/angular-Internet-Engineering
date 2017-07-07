import { Component, OnInit } from '@angular/core';
import {Author} from "../author";
import {Book} from "../book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Book[];
  authors: Author[];
  selectedBook: Book;

  constructor() {
    this.authors = Author.getTestData();
    this.books = Book.getTestData(this.authors);
    this.selectedBook = new Book('');
  }

  ngOnInit() {
  }

  onEditBook(book: Book){
    this.selectedBook = Object.assign({}, book);
  }

  onRemoveBook(book: Book){
    let index = this.books.indexOf(book, 0);
    if (index > -1) {
      this.books.splice(index, 1);
    }
  }

  onSaveBook(book: Book){
    let index = this.books.findIndex(a => a.id == book.id);
    this.books[index] = Object.assign({}, book);
  }

  onAddBook(book: Book){
    this.books.push(new Book(book.title, book.author));
  }
  
}
