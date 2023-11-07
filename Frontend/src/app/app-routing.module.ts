import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'', component:PostComponent},
  {path:'add', component:PostCreateComponent},
  {path:'sign-in', component:LoginComponent},
  {path:'sign-up', component:RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
