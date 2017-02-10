import { Component, OnInit } from '@angular/core';
import { Resume } from '../resume';
import { ResumeService } from '../resume.service';
import { ModalYesNoComponent } from '../modals/modal-yesno.component';
import { ModalOkComponent } from '../modals/modal-ok.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'trans-user-resumes-list',
    templateUrl: 'resumes-list.component.html'
})
export class ResumesListComponent implements OnInit {
    resumes: Resume[] = [];
    constructor(private resumeService: ResumeService, private modalService: NgbModal) { }
    async ngOnInit(): Promise<void> {
        const resumes = await this.resumeService.getAllAsync();
        this.resumes = resumes;
    }
    async delete(resume: Resume) {
        const yesNoModal = this.modalService.open(ModalYesNoComponent);
        const result = await yesNoModal.result;
        if (result !== 'yes') return;
        try {
            await this.resumeService.deleteAsync(resume._id);
            this.resumes.splice(this.resumes.indexOf(resume), 1);
        } catch (error) {
            const okModal = this.modalService.open(ModalOkComponent);
            okModal.componentInstance.message = 'Erro ao excluir.';
        }
    }
}