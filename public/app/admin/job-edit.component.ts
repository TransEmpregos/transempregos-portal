import { CompanyService } from '../company.service';
import { Company } from '../company';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-job-edit',
    templateUrl: 'job-edit.component.html',
    styleUrls: ['form.component.css']
})
export class JobEditComponent implements OnInit {
    job: Job;
    companies: Company[] = [];

    constructor(private jobService: JobService, private route: ActivatedRoute,
    private companyService: CompanyService, private router: Router) {
     }

    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.jobService.getJobAsync(params['id']))
        .subscribe(job => this.job = job);

        this.loadCompanies();
    }

    async loadCompanies(): Promise<void> {
        const companies = await this.companyService.getAllAsync();
        this.companies = companies;
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