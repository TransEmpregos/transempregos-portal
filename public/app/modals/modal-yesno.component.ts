import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'trans-modal-yes-no',
    template: `
    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('no')">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="modal-title">{{title}}</h4>
    </div>
    <div class="modal-body">
      <p>{{mensagem}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('no')">{{no}}</button>
      <button type="button" class="btn btn-primary" (click)="activeModal.close('yes')">{{yes}}</button>
    </div>
  `
})
export class ModalYesNoComponent {
    @Input() yes = 'Sim';
    @Input() no = 'Não';
    @Input() mensagem = 'Confirma?';
    @Input() title = 'Transempregos';
    constructor(public activeModal: NgbActiveModal) { }
}