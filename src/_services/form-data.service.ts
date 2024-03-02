import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from 'src/_interfaces/book';
@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  // private formDataSubject = new BehaviorSubject<Book | null>(null);
  // formData$ = this.formDataSubject.asObservable();
  private formDataSubject = new Subject<Book>();
  private bookIndexSubject = new Subject<number>();
  formData$ = this.formDataSubject.asObservable();
  bookIndex$ = this.bookIndexSubject.asObservable();
  setFormValues(data: Book) {
    this.formDataSubject.next(data);
  }
  setBookIndex(index: number) {
    this.bookIndexSubject.next(index);
  }
}
