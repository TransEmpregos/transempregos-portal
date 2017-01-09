declare var log: debug.IDebugger;
declare namespace NodeJS {
    export interface Global {
        log: typeof debug;
    }
}
interface XMLHttpRequest { } // this is because of superagent/index.d.ts, a dependency of supertest