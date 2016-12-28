import { Directive, Input } from '@angular/core';
@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
}