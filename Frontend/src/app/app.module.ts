import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import these modules
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, PostComponent, PostCreateComponent, RegistrationComponent, LoginComponent  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule], // Add these modules
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
