class UpMonitor {
    public get isUp() { return this.up; }
    public get isDown() { return !this.up; }
    public get reason() { return this._reason; }
    private up = false;
    private _reason: string;
    public set( state:  boolean | { up: boolean } | { down: boolean }, reason: string ) {
        if (typeof state === 'boolean')
            this.up = state;
        else if (typeof (<{up: boolean}>state).up !== 'undefined')
            this.up = (<{up: boolean}>state).up;
        else if (typeof (<{down: boolean}>state).down !== 'undefined')
            this.up = !(<{down: boolean}>state).down;
        this._reason = reason;
    }
}
export let upMonitor = new UpMonitor();