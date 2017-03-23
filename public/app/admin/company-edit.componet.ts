import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../company';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-company-edit',
    templateUrl: 'company-edit.component.html',
    styleUrls: ['form.component.css']
})
export class CompanyEditComponent implements OnInit {
    company: Company;
    constructor(private companyService: CompanyService, private route: ActivatedRoute, private router: Router) {
     }

    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.companyService.getCompanyAsync(params['id']))
        .subscribe(company => this.company = company);
    }

    async save(form: NgForm) {
        if (form.invalid) {
            return;
        }
        await this.companyService.updateAsync(this.company);
        this.goBack();
    }

    goBack() {
        this.router.navigate(['/admin/company']);
    }
}