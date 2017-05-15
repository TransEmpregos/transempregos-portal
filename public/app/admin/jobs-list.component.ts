import { CompanyService } from './../company.service';
import { Company } from './../company';
import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';
import { ModalYesNoComponent } from '../modals/modal-yesno.component';
import { ModalOkComponent } from '../modals/modal-ok.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from './../state.service';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-jobs-list',
    templateUrl: 'jobs-list.component.html',
    styleUrls: ['base-test.component.css']
})
export class JobsListComponent implements OnInit {
    jobs: Job[] = [];
    companies: Company[] = [];
    states: any = [];

    constructor(private jobService: JobService, private companyService: CompanyService,
        private stateService: StateService,
        private modalService: NgbModal) { }

    async ngOnInit(): Promise<void> {
        const companies = await this.companyService.getAllAsync();
         this.states = this.stateService.getStatesAsync();

        for (let i = 0; i < companies.length; i++) {
            const companyJobs = await this.companyService.getAllCompanyJobsAsync(companies[i]._id);
            companies[i].jobs = companyJobs;
        }
        this.companies = companies;
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