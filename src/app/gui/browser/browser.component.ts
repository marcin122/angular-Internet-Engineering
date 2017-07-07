import { Component, OnInit } from '@angular/core';
import {Author} from "../author";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Book} from "../book";
import {AuthorService} from "../author.service";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  authors: Author[];
  books: Book[];

  selectedAuthor: Author;
  selectedBook: Book;

  authorControl = new FormControl();
  bookControl = new FormControl();

  filteredAuthors: Observable<Author[]>;
  filteredBooks: Observable<Book[]>;

  constructor(private authorService: AuthorService) {
    this.books = Book.getTestData(Author.getTestData());
  }

  ngOnInit() {
    this.authorService.getAll().subscribe(
        authors => {
          this.authors = authors;
          this.filteredAuthors = this.authorControl.valueChanges
              .startWith(null)
              .map(author => author && typeof author === 'object' ? author.name : author)
              .map(name => name ? this.filterAuthor(name) : this.authors.slice());
        }
    );

    this.filteredBooks = this.bookControl.valueChanges
        .startWith(null)
        .map(book => book && typeof book === 'object' ? book.title : book)
        .map(title => title ? this.filterBook(title) : this.books.slice());
  }

  filterAuthor(val: string): Author[] {
    let expr = `^${val}`;
    return this.authors.filter(author => new RegExp(expr, 'gi').test(author.name.toString()));
  }

  filterBook(val: string): Book[] {
    let expr = `^${val}`;
    return this.books.filter(book => new RegExp(expr, 'gi').test(book.title.toString()));
  }

  displayAuthor(author: Author): String {
    return author ? author.name : '';
  }

  displayBook(book: Book): String {
    return book ? book.title : '';
  }
}
