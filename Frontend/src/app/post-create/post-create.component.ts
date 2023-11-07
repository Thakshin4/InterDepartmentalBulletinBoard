import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  postForm: FormGroup;

  constructor(private postService: PostService) {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  createPost() {
    if (this.postForm.valid) {
      const postData = {
        title: this.postForm.value.title,
        content: this.postForm.value.content
      };

      this.postService.createPost(postData).subscribe(() => {
        // Reset the form after successful post creation
        this.postForm.reset();
      });
    }
  }
}
