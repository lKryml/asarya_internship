import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs';
import { Book } from 'src/_interfaces/book';
import { BookService } from 'src/_services/book.service';
import { FormDataService } from 'src/_services/form-data.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  books: Book[] = [];
  bookGroup = new FormGroup({
    id: new FormControl(-1, { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    quantity: new FormControl(1, { nonNullable: true }),
    author: new FormControl('', { nonNullable: true }),
  });
  @Output() formDataSent = new EventEmitter<any>();
  constructor(
    private formDataService: FormDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private bookService: BookService
  ) {
    this.formDataService.formData$.pipe(take(1)).subscribe((data) => {
      console.log(data);
      this.books.push(data);
      console.log(data);
      console.log(this.books);
      console.log(this.books[0].name);
      console.log(typeof data);
      console.log(typeof this.books);
      console.log(typeof this.books[0]);
      this.changeDetectorRef.markForCheck();
    });
    this.formDataService.bookIndex$.pipe(take(1)).subscribe((data) => {
      console.log(data);

      console.log(typeof data);
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnInit() {
    // Access form data from the service if needed
    this.formDataService.formData$.pipe(take(1)).subscribe((data) => {
      this.books.push(data);
      console.log(data);
      console.log(this.books);
      console.log(this.books[0].name);
      this.changeDetectorRef.markForCheck();
    });
  }

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
        const index = this.books.findIndex((b) => b.id === updatedBook.id);
        this.books[index] = updatedBook;
        this.bookGroup.reset();
      });
  }

  submitForm() {
    const formData = this.bookGroup.value as Book; // Change the type to Book
    this.formDataService.setFormValues(formData);
    this.formDataSent.emit(formData);
  }

  // ... form logic here
}
