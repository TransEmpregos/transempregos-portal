import { CompanyService } from './../company.service';
import { Company } from './../company';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { StateService } from '../state.service';
import { CityService } from '../city.service';
import { Job } from '../job';
import { State } from '../state';
import { City } from '../city';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-job-edit',
    templateUrl: 'job-edit.component.html',
    styleUrls: ['form.component.css']
})
export class JobCreateComponent implements OnInit {

    private job: Job;
    companies: Company[] = [];
    states: State[];
    cities: City[];

    async ngOnInit(): Promise<void> {
        const companies = await this.companyService.getAllAsync();
        this.companies = companies;
        this.job = new Job();
        this.states = await this.stateService.getStatesAsync();
    }

    constructor(private jobService: JobService,
        private companyService: CompanyService,
        private stateService: StateService,
        private cityService: CityService,
        private router: Router) {
     }

     async loadCitiesOfState(id: string): Promise<void>{
         this.cities = await this.stateService.getAllStatetCitiesAsync(id);
         //this.cities = await this.cityService.getAllStatetCitiesAsync("1");
         console.log("Aqui "+id);
     }

    async save(form: NgForm) {
        if (form.invalid) {
            return;
        }
        await this.jobService.createAsync(this.job);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/admin/job']);
    }
}