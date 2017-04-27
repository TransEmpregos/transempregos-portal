import { JobUser } from './jobuser';
import { College } from './college';

export class Resume {
    _id: string;
    private areasOfInterest: Array<string> = [];
    private jobList: Array<JobUser> = [];
    private collegeFormation: Array<College> = [];
    constructor();
    constructor(name: string, email: string, register: string, birthday: Date);
    constructor(public name?: string, public email?: string, public register?: string, public birthday?: Date) { }


    public addFormation(college: College) { this.collegeFormation.push(college);  }

    public removeFormation(college: College) {
        let collegeFound =  this.collegeFormation.filter(col => col === college )[0];
        console.log(collegeFound);

        if (collegeFound) {
            let id = this.collegeFormation.indexOf(collegeFound);
            this.collegeFormation.splice(id);
        }
    }

    public addAreaOfInterest(area: string) { this.areasOfInterest.push(area); }

    public removeAreaOfInterest(area: string) {
        let areaFound = this.areasOfInterest.filter(ar => ar === area)[0];
        if (areaFound) {
            let id = this.areasOfInterest.indexOf(area);
            this.areasOfInterest.splice(id);
        }
    }


    public addJob(job: JobUser) { this.jobList.push(job); }

    public removeJob(job: JobUser) {
        let jobFound = this.jobList.filter(j => j === job)[0];
        if (jobFound) {
            let id = this.jobList.indexOf(jobFound);
            this.jobList.splice(id);
        }
    }



}
