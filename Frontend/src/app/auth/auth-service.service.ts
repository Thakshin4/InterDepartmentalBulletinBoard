import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private backendUrl = 'https://localhost:3000/api/users'; // Replace with your actual API URL

  private token!: string;

  constructor(private http: HttpClient) { }

    // Method to register a new user
  registerUser(userData: any) {
    this.http.post(`${this.backendUrl}/register`, {userData}).subscribe(response => {});
  }

  // Method to log in a user
  loginUser(userData: any) {
    this.http.post<{token: string}>(`${this.backendUrl}/login`, {userData}).subscribe(response => {
      const token = response.token;
      this.token = token;
    });
  }

  getToken(){
    return this.token;
  }
}
