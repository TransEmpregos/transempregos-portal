import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'trans-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    areaFormHome: String = 'candidate';

    constructor() { }

    ngOnInit() { }

    setAreaFormHome(role: string) {
        this.areaFormHome = role;
    }
}