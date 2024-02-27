import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Book } from '../book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  book: Book = {
    name: 'krym  api',
    quantity: 1,
    author: 'awadwdawd',
  };
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getBook().subscribe((data) => {
      console.log(data);
    });

    this.dataService.addBook(this.book).subscribe((data) => {
      console.log(data);
    });
  }
}
