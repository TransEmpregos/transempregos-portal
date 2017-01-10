import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective } from './test-support/router-stubs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLImageElement;
    let links: RouterLinkStubDirective[];
    let linkDes: DebugElement[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, RouterLinkStubDirective],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();

        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement
            .queryAll(By.directive(RouterLinkStubDirective));

        // get the attached link directive instances using the DebugElement injectors
        links = linkDes.map(linkDe => linkDe.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('img.header-logo'));
        el = <HTMLImageElement>de.nativeElement;
    });

    it('should display original title', () => {
        fixture.detectChanges();
        el.attributes['alt'].value.should.equal(`Logo ${comp.title}`);
    });

    it('should display a different test title', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        el.attributes['alt'].value.should.equal('Logo Test Title');
    });

    it('can get RouterLinks from template', () => {
        links.length.should.eq(5, 'should have 5 links');
        links[0].linkParams.should.equal('/', '1st link should go Home');
        links[1].linkParams.should.equal('/sobre', '1st link should go to the About area');
    });
});