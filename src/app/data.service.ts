import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getBook() {
    return this.http.get('/api/Controller/all_books');
  }

  addBook(userObject: { name: string; quantity: number; author: string }) {
    return this.http.post('/api/Controller/add_book', userObject);
  }
}
