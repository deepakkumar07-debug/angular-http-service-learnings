import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-errors';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts;
  //posts: any[];
  constructor(private service: PostService) {}
  //  to make understandable we say its a html input element not string
  // also improve compile time checking
  createPost(input: HTMLInputElement) {
    //  we cant use http reference here because its inside constructor
    // if we want to use we give private modifier so that it will private to the class
    // let post:any ={title:input.value};//this is javascript object we know to convert js obj to Json object
    let post = { title: input.value }; //this is javascript object we know to convert js obj to Json object
    input.value = '';
    this.service.create(post).subscribe(
      (response) => {
        // post.id=response;
        post['id'] = response['id'];
        // console.log('posted data',response);
        this.posts.splice(0, 0, post); //add at begiing of array first zero postion ,second zero no delete, element want to place
        console.log('posted data', response['id']);
      },
      (error: AppError) => {
        if (error instanceof BadInput) {
          // this.form.setErrors(error.originalError);
        } else throw error;
      }
    );
  }

  updatePosts(post) {
    let index = this.posts.indexOf(post);
    //  let updatedPost={title:"Post On C#"};
    post['title'] = 'Post On C++';
    //  instead of using /post
    // use specific /post/1
    //  use for only if few properties need to be update
    this.service.update(post).subscribe((response) => {
      //  updatedPost['id']=response['id']
      //  updatedPost['id']=response['id']
      console.log('Patch', response);
      //  this.posts.splice(index,0,updatedPost);
      this.posts.splice(index, 1, post);
      // console.log('after',updatedPost);
      console.log('after', post);
    }); // we dont need to handle error here we did it in globally
    //  use this for to update entire object
    //  this.http.put(this.apiUrl,JSON.stringify(post));
  }

  deletePost(post) {
    this.service.delete(post['id']).subscribe(
      (response) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        //  doesnot return anything
        console.log('removed', response);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert('this post has already been deleted.');
        else throw error; // rethrow an error
      }
    );
  }
  // getData(){
  //   return this.http.get(this.apiUrl);
  // }
  ngOnInit(): void {
    // http.get(this.apiUrl);//return type is observable of response
    // this.service.getPosts().toPromise().then((data)=>console.log("data",data[0]['id']))
    // this.service.getPosts()
    // .then((data) => {
    //   console.log("data",data);
    // })
    // .then((data) => {
    //   console.log("data",JSON.stringify(data));
    // })
    this.service.getAll().subscribe((response) => {
      // console.log(response)
      this.posts = response;
      console.log('posts', this.posts);

      // console.log(response[0])
    }); // we dont need to handle error here we did it in globally
  }
}
