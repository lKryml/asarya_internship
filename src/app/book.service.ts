import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  api = 'http://localhost:3000';

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.api}/books`);
  }

  create(book: Book): Observable<Book> {
    delete book.id;
    return this.http.post<Book>(`${this.api}/books/`, book);
  }

  update(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.api}/books/${book.id}`, book);
  }

  delete(id: number): Observable<Book> {
    return this.http.delete<Book>(`${this.api}/books/${id}`);
  }
}
