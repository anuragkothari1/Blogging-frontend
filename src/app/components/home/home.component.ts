import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Blog {
  heading: string;
  content: string;
  _id:any
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public heading: any;
  public content: any;
  public token: any;
  public yourBlogs:any
  public blogs:any
  public deleteId:any
  public page=1
  public page2=1
  public isDataFetched1:any
  public isDataFetched2:any
  public host="https://blogging-3-r70t.onrender.com"

  constructor(public router: Router, public http: HttpClient) {
   this.fetchdata();
   this.blogs = []; 
   this.yourBlogs=[];

   
  }
 fetchdata(){
    this.fetchdata1();
    this.fetchdata2();
   
  }
  // fetchdata1(){
  //   this.http.get<any>(`http://localhost:3000/api/getallblogs?page=${this.page}`).subscribe(
  //     (res) => {
  //       this.blogs = res.blogs;
  //       console.log(this.blogs)
  //     },
  //     (error) => {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   );
  // }
 

fetchdata1() {
  this.isDataFetched1=false
  this.http.get<any>(`${this.host}/api/getallblogs?page=${this.page}`).subscribe({
    next: (res) => {
      this.blogs = res.blogs;
     this.isDataFetched1=true
      console.log(this.blogs);
    },
    error: (error) => {
      console.error("Error fetching blogs:", error);
    }
  });
}

  fetchdata2(){

    if(!this.isTokenAvailable()){
      this.isDataFetched2=false
      const headers = new HttpHeaders({
        'X-Token': this.token
      });
   this.http.get<any>(`${this.host}/api/yourblogs?page=${this.page2}`,{ headers }).subscribe(res=>{this.yourBlogs=res.Blogs;this.isDataFetched2=true})
 
    }
  }

  isPreviousDisabled(){
    return this.page==1
  }
  isNextDisabled(){
    return this.blogs.length<4
  }
  isPrevious2Disabled(){
    return this.page2==1
  }
  isNext2Disabled(){
    return this.yourBlogs.length<4
  }
  next(){
    this.page=this.page+1
  
    this.fetchdata1()
  }
  previous(){
    this.page=this.page-1
    this.fetchdata1()
  }
  next2(){
this.page2=this.page2+1;
this.fetchdata2();
  }
  previous2(){
this.page2=this.page2-1;
this.fetchdata2()
  }

  isTokenAvailable() {
    this.token = localStorage.getItem('token');
    return this.token == null;
  }

  textAreaClicked() {
    if (this.isTokenAvailable()) {
      alert("Please login to write");
    }
  }

  logout() {
    localStorage.removeItem('token');
    // this.router.navigate(['/home'])
  }

  post() {
    const headers = new HttpHeaders({
      'X-Token': this.token
    });
  
    this.http.post<any>(`${this.host}/api/createblog`, { heading: this.heading, content: this.content }, { headers }).subscribe({
      next: (res) => {
        this.content = "";
        this.heading = "";
        console.log(res);
        if (res.success) {
          this.fetchdata();
        }
      },
      error: (error) => {
        console.error("Error posting blog:", error);
      }
    });
  }
  
  bloglength2(){
    return this.blogs && this.blogs.length==0
  }
  bloglength(){
    
      return this.yourBlogs && this.yourBlogs.length ==0
    
  }
  readMore(blogId:any){

    this.router.navigate(["/idblog",{ id: blogId }])
  }
  delete(deleteId:any){
    const headers = new HttpHeaders({
      'X-Token': this.token
    });
    this.deleteId=deleteId
    this.http.delete<any>(`${this.host}/api/deleteblog?blogId=${this.deleteId}`,{headers}).subscribe((res)=>{console.log(res); this.fetchdata(); })
  }

  edit(editId:any){
    console.log("edit clicked")
    this.router.navigate(["/editblog",{ id: editId }])

  }
}
