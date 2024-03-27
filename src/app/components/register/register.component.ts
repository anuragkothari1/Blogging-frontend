import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router:Router,private http: HttpClient){

  }
  public host="https://blogging-3-r70t.onrender.com"
  public name:any;
  public email:any
  public password:any

  loginClick(){
    this.router.navigate(["/login"])
  }
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  registerClicked(){
    if (!this.isValidEmail(this.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (this.password.length < 8) {
      alert("Password should have a minimum length of 8 characters.");
      return;
    }
    if (this.name.length < 4) {
      alert("Name should have more than 4 characters");
      return;
    }
    console.log("hi")
   const userdata={name:this.name,email:this.email,password:this.password}
   this.http.post<any>(`${this.host}/api/register`,userdata).subscribe((res)=>{
    console.log(res);if(res.success){
      localStorage.setItem("token",res.token)
    alert("Logged in")
    setTimeout(() => {
      localStorage.removeItem("token");
    }, 3600000);
   
    this.router.navigate(['/home'])
  }
  else{
    alert(res.message)
  }
},(e:any)=>{

alert(e.error.message)
}
)

  }
}
