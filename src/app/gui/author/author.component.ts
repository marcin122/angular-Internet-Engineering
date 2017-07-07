import { Component, OnInit } from '@angular/core';
import {Author} from "../author";
import {AuthorService} from "../author.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: Author[];
  selectedAuthor: Author;

  constructor(private authorService: AuthorService, private snackBar: MdSnackBar) {
    this.refresh();
    this.selectedAuthor = new Author();
  }

  ngOnInit() {
  }

  refresh() {
    this.authorService.getAll().subscribe(
        authors => this.authors = authors
    );
  }

  onEditAuthor(author: Author) {
    this.selectedAuthor = Object.assign({}, author);
  }

  onRemoveAuthor(author: Author) {
    const index = this.authors.indexOf(author, 0);
    if (index > -1) {
      this.authorService.remove(author.id.toString()).subscribe(
        resp => {
          this.authors.splice(index, 1);
        },
        error => {
          this.onError(error);
        }
      );
    }
  }

  onSaveAuthor(author: Author) {
    this.authorService.update(author.id.toString(), author.name.toString()).subscribe(
      author => {
        this.selectedAuthor = author;

        const index = this.authors.findIndex(a => a.id === author.id);
        this.authors[index] = Object.assign({}, author);
      },
      error => {
        this.onError(error);
      }
    );
  }

  onAddAuthor(author: Author) {
    this.authorService.create(author.name.toString()).subscribe(
        newAuthor => { this.authors.push(newAuthor); },
        error => {
          this.onError(error);
        }
    );
  }

  onError(error) {
    this.snackBar.open(error, 'Delete', {
      duration: 3000
    });
  }
}
