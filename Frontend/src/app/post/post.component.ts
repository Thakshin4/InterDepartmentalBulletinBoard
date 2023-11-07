import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe((data: any) => {
      this.posts = data;
    });
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      // Reload the posts after deletion
      this.loadPosts();
    });
  }
}
