import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from './modal-ok.component';
import * as sinon from 'sinon';

describe('AppComponent', () => {

    let comp: ModalOkComponent;
    let fixture: ComponentFixture<ModalOkComponent>;
    let buttonDe: DebugElement;
    let buttonElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalOkComponent]
        }).overrideComponent(ModalOkComponent, {

            set: {
                providers: [
                    { provide: NgbActiveModal, useValue: { close: sinon.spy() } }
                ]
            }
        }).compileComponents();
        fixture = TestBed.createComponent(ModalOkComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
        buttonDe = fixture.debugElement.query(By.css('button.btn-primary'));
        buttonElement = buttonDe.nativeElement;
    });

    it('should display original ok button caption', () => {
        fixture.detectChanges();
        buttonElement.textContent.should.equal(comp.ok);
    });

    it('should display a different ok button caption', () => {
        comp.ok = 'Confirm';
        fixture.detectChanges();
        buttonElement.textContent.should.equal('Confirm');
    });

    it('should close with click', () => {
        buttonDe.triggerEventHandler('click', null);
        comp.activeModal.close.should.have.been.calledOnce;
    });
});