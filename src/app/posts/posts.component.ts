import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts;
//posts: any[];
  apiUrl='https://jsonplaceholder.typicode.com/posts';
  constructor(http:HttpClient) {
    // http.get(this.apiUrl);//return type is observable of response
    http.get(this.apiUrl).subscribe(response=>{
      // console.log(response)
      this.posts=response;
      console.log("posts",this.posts);
      
      // console.log(response[0])
    })
   }
  // getData(){
  //   return this.http.get(this.apiUrl);
  // }
  ngOnInit(): void {
  }

}
