import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-editblog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editblog.component.html',
  styleUrl: './editblog.component.css'
})
export class EditblogComponent {
  public blogId:any;
public blog={heading: '',
content: ''}
  public token:any
  public host="https://blogging-3-r70t.onrender.com"
constructor(public route:ActivatedRoute, public http:HttpClient, public router:Router) {
  this.route.params.subscribe(params => {
    this.blogId = params['id'];
 
  });
  this.fetchdata();
}
 isTokenAvailable() {
  this.token =localStorage.getItem('token');
  
  return this.token !== null;
}
edit(){
  console.log("in edit section")
  if(this.isTokenAvailable()){
  const headers = new HttpHeaders({
    'X-Token': this.token
  });
  console.log("edit clicked")
  this.http.patch<any>(`${this.host}/api/editblog?blogId=${this.blogId}`, { heading: this.blog.heading, content: this.blog.content },{headers}).subscribe((res)=>{
    console.log(res)
    if(res.success){
      alert("Updated Successfully")
      this.router.navigate(['/home'])
    }
  })
}}
fetchdata(){
  this.http.get<any>(`${this.host}/api/getblogdetails?blogId=${this.blogId}`).subscribe((res)=>{console.log(res); this.blog=res.blog})
}
}
