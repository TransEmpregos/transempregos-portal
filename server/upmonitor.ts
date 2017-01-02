class UpMonitor {
    public get isUp() { return this._up; }
    public get isDown() { return !this._up; }
    public get reason() { return this._reason; }
    private _up = false;
    private _reason = 'Not yet initialized.';
    reset() {
        this._up = false;
        this._reason = 'Not yet initialized.';
    }
    set( state:  boolean | { up: boolean } | { down: boolean }, reason: string ) {
        if (typeof state === 'boolean')
            this._up = state;
        else if (typeof (<{up: boolean}>state).up !== 'undefined')
            this._up = (<{up: boolean}>state).up;
        else if (typeof (<{down: boolean}>state).down !== 'undefined')
            this._up = !(<{down: boolean}>state).down;
        this._reason = reason;
    }
}
export let upMonitor = new UpMonitor();