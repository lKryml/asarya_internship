import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Observable, take } from 'rxjs';
import { Book } from '../book';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  bookGroup = new FormGroup({
    id: new FormControl(-1, { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    quantity: new FormControl(1, { nonNullable: true }),
    author: new FormControl('', { nonNullable: true }),
  });

  // book: Book = {
  //   id: 1,
  //   name: 'krymaapi',
  //   quantity: 1,
  //   author: 'awadwdawd',
  // };

  constructor(private bookService: BookService) {
    this.bookService
      .getAll()
      .pipe(take(1))
      .subscribe((books) => {
        this.books = books;
      });
  }

  ngOnInit(): void {}

  createOrUpdateBook(): void {
    this.bookGroup.value.id === -1 ? this.createBook() : this.updateBook();
  }

  createBook(): void {
    this.bookService
      .create(this.bookGroup.value as Book)
      .pipe(take(1))
      .subscribe((createdBook) => {
        this.books.push(createdBook);
        this.bookGroup.reset();
      });
  }

  updateBook(): void {
    this.bookService
      .update(this.bookGroup.value as Book)
      .pipe(take(1))
      .subscribe((updatedBook) => {
        const index = this.books.findIndex((b) => {
          b.id === updatedBook.id;
        });
        this.books[index] = updatedBook;
        this.bookGroup.reset();
      });
  }

  startEdit(index: number): void {
    this.bookGroup.patchValue(this.books[index]);
  }

  deleteBook(index: number): void {
    this.bookService
      .delete(this.books[index].id as number)
      .pipe(take(1))
      .subscribe(() => {
        this.books = this.books.filter((b) => b.id !== this.books[index].id);
      });
  }

  // this.bookService.create(this.book).subscribe((data) => {
  //     console.log(data);
  //   });
}
