import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError,throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  constructor(public router:Router,public http:HttpClient){

  }
  
  public host="https://blogging-3-r70t.onrender.com"
  login(){
    const userdata={email:this.email,password:this.password}
 this.http.post<any>(`${this.host}/api/login`,userdata).subscribe((res)=>{
  console.log(res);
  if(res.success){
    localStorage.setItem("token",res.token)
    alert("Logged in")
    setTimeout(() => {
      localStorage.removeItem("token");
    }, 3600000);
    this.router.navigate(['/home'])
  }
   },(e:any)=>{
        alert(e.error.message)
   })

  } 
registerClick(){
  this.router.navigate(['/register'])
}
 public email="";
 public password=""
}
