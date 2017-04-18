import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'trans-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'Transempregos';
  private logout: any;
  private isLoggedIn: boolean;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.logout = this.userService.user;
    this.isLoggedIn = this.userService.isLoggedIn();
    console.log(this.userService.isLoggedIn());
  }

  async logoutAsync() {
    await this.userService.logout(); 
    
    this.tryToGoHome();

    console.log("olá");
  }

   private tryToGoHome() {
    this.router.navigate(['']);
  }
}