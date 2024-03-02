import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Book } from '../../_interfaces/book';
@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})
export class BookModalComponent {
  book = {} as Book;
  constructor(public bsModalRef: BsModalRef) {}
}
