import { Component } from '@angular/core';
import { UserService } from '../service/user.service'; // Update with the correct path

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  userData: any = {}; // Data from the registration form

  constructor(private userService: UserService) {}

  registerUser() {
    this.userService.registerUser(this.userData).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        // Handle success, e.g., redirect to another page
      },
      (error) => {
        console.error('Error registering user', error);
        // Handle registration error, display error message, etc.
      }
    );
  }
}
