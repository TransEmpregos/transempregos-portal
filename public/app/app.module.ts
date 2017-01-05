import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JobService } from './job.service';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { JobEditComponent } from './admin/job-edit.component';
import { JobsListComponent } from './admin/jobs-list.component';
import { JobCreateComponent } from './admin/job-create.component';
import { ModalYesNoComponent } from './modals/modal-yesno.component';
import { ModalOkComponent } from './modals/modal-ok.component';
import { HomeComponent } from './home/home.component';
import { LoginRecruterComponent } from './login/login-recruter.component';
import { AppRoutingModule } from './app-routing.module';
import './rxjs-extensions';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AdminComponent,
        HomeComponent,
        LoginRecruterComponent,
        JobEditComponent,
        JobsListComponent,
        JobCreateComponent,
        ModalYesNoComponent,
        ModalOkComponent
    ],
    providers: [JobService],
    entryComponents: [ModalYesNoComponent, ModalOkComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }