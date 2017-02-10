import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'trans-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    readonly CANDIDATE: String = 'candidate';
    readonly RECRUITER: String = 'recruiter';

    areaFormHome: String = this.CANDIDATE;

    constructor() { }

    ngOnInit() { }

    setAreaFormHome(role: string) {
        this.areaFormHome = role;
    }
}