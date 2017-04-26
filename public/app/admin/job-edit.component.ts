import { CompanyService } from '../company.service';
import { Company } from '../company';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JobService } from '../job.service';
import { StateService } from '../state.service';
import { Job } from '../job';
import { State } from '../state';
import { City } from '../city';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-job-edit',
    templateUrl: 'job-edit.component.html',
    styleUrls: ['form.component.css']
})
export class JobEditComponent implements OnInit {
    job: Job;
    companies: Company[] = [];
    states: State[] = [];
    cities: City[] = [];

    constructor(private jobService: JobService,
        private route: ActivatedRoute,
        private stateService: StateService,
        private companyService: CompanyService,
        private router: Router) {
     }

    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.jobService.getJobAsync(params['id']))
        .subscribe(job => {this.job = job, this.loadCitiesOfState(job.state.toString())});
        this.loadCompanies();
    }

    async loadCompanies(): Promise<void> {
        const companies = await this.companyService.getAllAsync();
        this.companies = companies;

        const states = await this.stateService.getStatesAsync();
        this.states = states;
    }

    async loadCitiesOfState(id: string): Promise<void>{
         this.cities = await this.stateService.getAllStatetCitiesAsync(id);
     }

    async save(form: NgForm) {
        if (form.invalid) {
            return;
        }
        await this.jobService.updateAsync(this.job);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/admin/job']);
    }
}