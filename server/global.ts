declare var debug: debug.IDebugger;
declare namespace NodeJS {
    export interface Global {
        debug: typeof debug;
    }
}