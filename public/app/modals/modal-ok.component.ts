import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'trans-modal-ok',
    template: `
    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('ok')">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="modal-title">{{title}}</h4>
    </div>
    <div class="modal-body">
      <p>{{message}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('ok')">{{ok}}</button>
    </div>
  `
})
export class ModalOkComponent {
    @Input() ok = 'OK';
    @Input() message = 'Booooooo!';
    @Input() title = 'Transempregos';
    constructor(public activeModal: NgbActiveModal) { }
}