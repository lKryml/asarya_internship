import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './book';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getBook() {
    return this.http.get('http://195.234.122.131:8220/Controller/all_books');
  }

  addBook(book: Book) {
    return this.http.post(
      'http://195.234.122.131:8220/Controller/add_book',
      book
    );
  }

  // addBook1(book: Book): Observable<Book> {
  //   return this.http
  //     .post<Book>('http://195.234.122.131:8220/Controller/add_book', book)
  //     .pipe(catchError((error: any) => this.handleError('add_book', error)));
  // }

  // private handleError(operation: string, error: any): Observable<never> {
  //   return throwError(error);
  // }
}
