import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from '../../_services/book.service';
import { Observable, take } from 'rxjs';
import { Book } from '../../_interfaces/book';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormDataService } from 'src/_services/form-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  // book: Book = {
  //   id: 1,
  //   name: 'krymaapi',
  //   quantity: 1,
  //   author: 'awadwdawd',
  // };

  constructor(
    private bookService: BookService,
    public formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.bookService
      .getAll()
      .pipe(take(1))
      .subscribe((books) => {
        this.books = books;
      });
  }

  startEdit(index: number): void {
    // this.bookGroup.patchValue(this.books[index]);
    this.formDataService.setBookIndex(index);
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
