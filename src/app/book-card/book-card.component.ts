import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Book } from '../book';
import { BookModalComponent } from '../book-modal/book-modal.component';
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book = {} as Book;
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}
  openProjectModal() {
    const modalOptions: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        book: this.book,
      },
    };
    this.bsModalRef = this.modalService.show(BookModalComponent, modalOptions);
  }
}
