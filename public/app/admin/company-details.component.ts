import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../company';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-company-details',
    templateUrl: 'company-details.component.html',
    styleUrls: ['base-test.component.css']
})
export class CompanyDetailsComponent implements OnInit {
    company: Company;
    constructor(private companyService: CompanyService, private route: ActivatedRoute, private router: Router) {
     }

    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.companyService.getCompanyAsync(params['id']))
        .subscribe(company => this.company = company);
    }

    goBack() {
        this.router.navigate(['/admin/company']);
    }
}