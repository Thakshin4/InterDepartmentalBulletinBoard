import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendUrl = 'https://localhost:3000/api/users'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to register a new user
  registerUser(userData: any) {
    return this.http.post(`${this.backendUrl}/register`, userData);
  }

  // Method to log in a user
  loginUser(userData: any) {
    return this.http.post(`${this.backendUrl}/login`, userData);
  }
}
