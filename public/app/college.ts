export class College {
    _id: string;
    constructor();
    constructor( name: string, nameOfCurse: string, date: Date, description: string );
    constructor( public name?: string, public nameOfCurse?: string, public date?: Date, public description?: string ) {}
}