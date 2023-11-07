import { Component, SecurityContext } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service'; // Update with the correct path
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  userData = { username: '', password: '' }; // Removed "any" type to better match your data model

  constructor(
    private authServiceService: AuthServiceService, 
    private sanitizer: DomSanitizer) {}

  registerUser() {
    // Check if the form fields are valid before submitting
    if (this.validateForm()) {

      const sanitizedUserData = {
        username: this.sanitizer.sanitize(
          SecurityContext.HTML,
          this.userData.username
        ),
        password: this.sanitizer.sanitize(
          SecurityContext.HTML,
          this.userData.password
        ),
      };

      this.authServiceService.registerUser(this.userData).subscribe(
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

  private validateForm(): boolean {
  if (!this.userData.username || !this.userData.password) {
    console.error('Form is incomplete. Please fill in all fields.');
    return false; // Form is invalid
  }
    // Use a regular expression to check if the password matches the pattern
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(this.userData.password)) {
      console.error('Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long.');
      return false; // Form is invalid
  }
    return true; // Form is valid
  }
}
