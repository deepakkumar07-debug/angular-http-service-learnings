import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl='https://jsonplaceholder.typicode.com/posts';

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get(this.apiUrl);
  }
  createPost(post){
    return this.http.post(this.apiUrl,JSON.stringify(post));
  }
  updatePost(post){
    return this.http.patch(this.apiUrl + '/' + post.id,JSON.stringify(post));

  }

  deletePost(id){
    return this.http.delete(this.apiUrl +'/' +id)//here we dont have body of the request;
  }
}
