import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private backendUrl = 'https://localhost:3000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to get all posts
  getAllPosts() {
    return this.http.get(`${this.backendUrl}/posts`);
  }

  // Method to create a new post
  createPost(postData: any) {
    return this.http.post(`${this.backendUrl}/posts`, postData);
  }

  // Method to delete a post by ID
  deletePost(postId: string) {
    return this.http.delete(`${this.backendUrl}/posts/${postId}`);
  }
}
