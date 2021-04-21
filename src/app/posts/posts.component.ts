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
  private apiUrl='https://jsonplaceholder.typicode.com/posts';
  constructor(private http:HttpClient) {
    // http.get(this.apiUrl);//return type is observable of response
    http.get(this.apiUrl).subscribe(response=>{
      // console.log(response)
      this.posts=response;
      console.log("posts",this.posts);
      
      // console.log(response[0])
    })
   }
  //  to make understandable we say its a html input element not string
  // also improve compile time checking
   createPost(input:HTMLInputElement){
    //  we cant use http reference here because its inside constructor 
    // if we want to use we give private modifier so that it will private to the class
    // let post:any ={title:input.value};//this is javascript object we know to convert js obj to Json object
    let post ={title:input.value};//this is javascript object we know to convert js obj to Json object
    input.value='';
    this.http.post(this.apiUrl,JSON.stringify(post))
    .subscribe(response=>{
      // post.id=response;
      post['id']=response['id'];
      // console.log('posted data',response);
      this.posts.splice(0,0,post);//add at begiing of array first zero postion ,second zero no delete, element want to place
      console.log('posted data',response['id']);
    })
   } 
  // getData(){
  //   return this.http.get(this.apiUrl);
  // }
  ngOnInit(): void {
  }

}
