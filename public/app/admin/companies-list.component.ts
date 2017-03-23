import { CompanyService } from './../company.service';
import { Company } from './../company';
import { Component, OnInit } from '@angular/core';
import { ModalYesNoComponent } from '../modals/modal-yesno.component';
import { ModalOkComponent } from '../modals/modal-ok.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'trans-admin-companies-list',
    templateUrl: 'companies-list.component.html',
    styleUrls: ['base-test.component.css']
})
export class CompaniesListComponent implements OnInit {
    companies: Company[] = [];
    constructor(private companyService: CompanyService, private modalService: NgbModal) { }
    async ngOnInit(): Promise<void> {
        const companies = await this.companyService.getAllAsync();
        this.companies = companies;
    }
    async delete(company: Company) {
        const yesNoModal = this.modalService.open(ModalYesNoComponent);
        const result = await yesNoModal.result;
        if (result !== 'yes') return;
        try {
            await this.companyService.deleteAsync(company._id);
            this.companies.splice(this.companies.indexOf(company), 1);
        } catch (error) {
            const okModal = this.modalService.open(ModalOkComponent);
            okModal.componentInstance.message = 'Erro ao excluir.';
        }
    }
}