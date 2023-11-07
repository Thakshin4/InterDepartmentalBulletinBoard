import { Component } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service'; // Update with the correct path

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userData: any = {}; // Data from the login form

  constructor(private authService: AuthServiceService) {}

  loginUser() {
    this.authService.loginUser(this.userData)
  }
}
