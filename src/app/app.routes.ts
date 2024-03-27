import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditblogComponent } from './components/editblog/editblog.component';

export const routes: Routes = [{path:"",redirectTo:"/home",pathMatch:"full"},{path:"home",component:HomeComponent},{path:"login",component:LoginComponent},{path:"register", component:RegisterComponent},{path:"idblog",component:BlogComponent},{path:"editblog",component:EditblogComponent}];
