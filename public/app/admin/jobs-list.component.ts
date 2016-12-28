import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';
import { ModalYesNoComponent } from '../modals/modal-yesno.component';
import { ModalOkComponent } from '../modals/modal-ok.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-jobs-list',
    templateUrl: 'jobs-list.component.html'
})
export class JobsListComponent implements OnInit {
    jobs: Job[] = [];
    constructor(private jobService: JobService, private modalService: NgbModal) { }
    async ngOnInit(): Promise<void> {
        const jobs = await this.jobService.getAllAsync();
        this.jobs = jobs;
    }
    async delete(job: Job) {
        const yesNoModal = this.modalService.open(ModalYesNoComponent);
        const result = await yesNoModal.result;
        if (result !== 'yes') return;
        try {
            await this.jobService.deleteAsync(job._id);
            this.jobs.splice(this.jobs.indexOf(job), 1);
        } catch (error) {
            const okModal = this.modalService.open(ModalOkComponent);
            okModal.componentInstance.message = 'Erro ao excluir.';
        }
    }
}