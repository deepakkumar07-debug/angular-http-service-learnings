# AngularHttpServiceLearnings

https://jsonplaceholder.typicode.com/

## HTTp Requests

GET => Get Data
POST => Create Data
PUT => Update data
DELETE => Delete data

## Getting data

https://jsonplaceholder.typicode.com/posts

HttpClient will help us fetch external data, post to it, etc. We need to import the http module to make use of the http service. Let us consider an example to understand how to make use of the http service.

- first step is use http service go to `app.module.ts`
- inside imports [HttpClientModule] import new Module HttpClientModule

- we use observable and promises to work with non-blocking or asynchronous operations
- we go over network we gonna call this server and data is not avaiable on immediately there may some delay
- during this time we dont want our main thread which is executing the code get blocked
- we use promises and observables with this classes when the result is ready will be notified
- **observable has method called subscribe** see the below code we chain the observable method
- which means subscribing observable

```js
http.get(this.apiUrl); //return type is observable of response
http.get(this.apiUrl).subscribe();
```

- with this when the result is ready will be notified
- this subscribe method has 5 overloads
- 5 ways we can use this subscribe method
- each overloads has different parameters
- here we gonna use 4th overload
- here we have 2 params
- `next?` and `error` both are optional
- type of `next?:` property is arrow function this function takes a value which is a response and return void
- returns an array of object.

- there are some time we get response as object instead of array of object
- that time we need to convert response.json();

## example

`app.ts`

```js
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  posts;

  apiUrl = "https://jsonplaceholder.typicode.com/posts";
  constructor(http: HttpClient) {
    // http.get(this.apiUrl);//return type is object
    http.get(this.apiUrl).subscribe((response) => {
      // console.log(response)
      this.posts = response;
      console.log("posts", this.posts);

      // console.log(response[0])
    });
  }
  ngOnInit(): void {}
}
```

`app.component.html`

```html
<div class="container">
  <ul class="list-group">
    <li *ngFor="let post of posts" class="list-group-item">{{post.title}}</li>
  </ul>
</div>
```

## Creating Data

when creating http post request body of the request is json object thats the object we want send data to the server.

```js
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts;
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
      post['id']=response['id'];
      // console.log('posted data',response);
      this.posts.splice(0,0,post);//add at begiing of array first zero postion ,second zero no delete, element want to place
      console.log('posted data',response['id']);
    })
   }

  ngOnInit(): void {
  }

}

```

```html
<div class="container">
  <!-- keyupEvent.filter -->
  <!-- when user presses enter we gonna call createPost() method -->
  <!-- as an argument to this input method we gonna pass input field reference -->
  <!-- so we create template reference variable with leading # -->
  <input
    (keyup.enter)="createPost(title)"
    #title
    type="text"
    class="form-control"
  />
  <ul class="list-group">
    <li *ngFor="let post of posts" class="list-group-item">{{post.title}}</li>
  </ul>
</div>
```

## updating data

```js
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

   updatePosts(post){
     let index=this.posts.indexOf(post);
     post['title']="Post On C++";
    //  instead of using /post
    // use specific /post/1
    //  use for only if few properties need to be update
     this.http.patch(this.apiUrl + '/' + post.id,JSON.stringify(post))
     .subscribe(response=>{
       console.log("Patch",response);

       this.posts.splice(index,1,post);

      console.log('after',post);
     })
    //  use this for to update entire object
    //  this.http.put(this.apiUrl,JSON.stringify(post));
   }

  ngOnInit(): void {
  }

}

```

## Deleting data

```js
  deletePost(post){
     let index=this.posts.indexOf(post);

     this.http.delete(this.apiUrl +'/' +post.id)//here we dont have body of the request
     .subscribe(response=>{
       this.posts.splice(index,1);
      //  doesnot return anything
      console.log('removed',response)
     })

   }
```

```html
<div class="container">
  <!-- keyupEvent.filter -->
  <!-- when user presses enter we gonna call createPost() method -->
  <!-- as an argument to this input method we gonna pass input field reference -->
  <!-- so we create template reference variable with leading # -->
  <input
    (keyup.enter)="createPost(title)"
    #title
    type="text"
    class="form-control"
  />
  <ul class="list-group">
    <li *ngFor="let post of posts" class="list-group-item">
      <button class="btn btn-info btn-sm mr-4" (click)="updatePosts(post)">
        Update
      </button>
      <button class="btn btn-danger btn-sm mr-4" (click)="deletePost(post)">
        delete
      </button>
      {{post.title}}
    </li>
  </ul>
</div>
```

## lifecycle hooks

all these methods are leading with ng

- OnInit defdined in OnInit interface
- OnChanges
- DoCheck
- AfterContentInit

## Separation of concerns

responsible
Our class should have a single responsibility

- A class that does too many things voilates Separation of concerns - principle
- then such a class is hard to maintain and hard to test
  **Solution**
- create another class all it as service
- this class is purely responsible for working with backend
- update post delete post all thing goes here api url
- in future any changes there is only one place we need to change
- all details working with backend is encapuslated in one place which service file
- we can reuse this in multiple places

## genrate service using cli

        ng g s post

- then add PostService in providers array
- then make servies folder and move all post.service files in services
-       cd src/app
        mkdir services
        mv post.service.* services

## observables

- Observables provide support for passing messages between parts of your application
- The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of state changes.
-

## Handling errors

unexpected error

- Server is offline
- Network is down
- Unhandled exceptions => server is up and running we call the server because somebug it fails

expected error
2 types of errors
Not found
404 error
Bad request
400

## Throwing Application Specific Errors

we have created AppError has a class and inherited to create app specific errors and with this implementatation we ahve achieved separation of concerns
`post-component.ts`

```ts
  createPost(input: HTMLInputElement) {
    let post = { title: input.value }; //this is javascript object we know to convert js obj to Json object
    input.value = '';
    this.service.createPost(post).subscribe(
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
        } else {
          alert('An unexpected error occured');
          console.log('CreatePostError', error);
        }
      }
    );
  }
  deletePost(post) {
    let index = this.posts.indexOf(post);
    this.service.deletePost(post['id']).subscribe(
      (response) => {
        this.posts.splice(index, 1);
        //  doesnot return anything
        console.log('removed', response);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert('this post has already been deleted.');
        else {
          alert('An unexpected error occured');
          console.log('deleteError', error);
        }
      }
    );
  }
```

`post-service.ts`

```ts
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppError } from "../common/app-errors";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = "https://jsonplaceholder.typicode.com/posts";
  private apiUrl2 = "http://www.omdbapi.com/?apikey=dfe6d885&s=cars";
  constructor(private http: HttpClient) {}

  getPosts() {
    // return this.http.get(this.apiUrl2).toPromise();
    return this.http.get(this.apiUrl);
  }
  createPost(post) {
    return this.http.post(this.apiUrl, JSON.stringify(post)).pipe(
      catchError((error: Response) => {
        if (error.status === 400)
          return Observable.throw(new BadInput(error.json()));

        return Observable.throw(new AppError(error.json()));
      })
    );
  }
  updatePost(post) {
    return this.http.patch(this.apiUrl + "/" + post.id, JSON.stringify(post));
  }

  deletePost(id) {
    return this.http.delete(this.apiUrl + "/" + id).pipe(
      catchError((error: Response) => {
        if (error.status === 404) return Observable.throw(new NotFoundError());

        return Observable.throw(new AppError(error));
      })
    ); //here we dont have body of the request;
  }
}
```

created `app/common/app-error.ts`

```ts
export class AppError {
  constructor(public originalError?: any) {}
}
```

```ts
import { AppError } from "./app-errors";

export class NotFoundError extends AppError {}
```

```ts
import { AppError } from "./app-errors";

export class BadInput extends AppError {}
```

## Importing Observable Operators and Factory Methods

## Global Error handling

in post-service we repeated unexpected error logic
now wew are going to handle that globaly becuase in futre we amy have many components

create a file called `app/common/app-error-handler.ts`

**head over to angular.io serach error handler**

https://angular.io/api/core/ErrorHandler

- If we look at the documentation we have a method called `handleError(error:any):void`.The defualt beahviour of this method is it just simply print the error in browser console.

- now we need to provide different implemntation of this class
- for our case we should display error to user and also log it in the console.
- so we should remove all unexpected errors handled in `posts.component.ts`
- and place it in our custom error handler

`app/common/app-error-handler.ts`

```ts
// defualt handleError() will print it on console

import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // throw new Error('Method not implemented.');

    // In future instead of alert we can toast it to the user
    // Instead of console.log log it in a server

    alert("An unexpected error occured");
    console.log("deleteError", error);
  }
}
```

- Then register this custom error on app.module.ts and instruct angular to take whenever http error happens take my custom Error handler class
- place below code in providers array

```ts
  providers: [
    PostService,
    { provide: ErrorHandler, useClass: AppErrorHandler }, // this code
  ],
```

- now clean up all unexpected code in posts.component.ts

```ts
import { Component, OnInit } from "@angular/core";
import { AppError } from "../common/app-errors";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
import { PostService } from "../services/post.service";

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  posts;
  //posts: any[];
  constructor(private service: PostService) {}
  //  to make understandable we say its a html input element not string
  // also improve compile time checking

  ngOnInit(): void {
    this.service.getPosts().subscribe((response) => {
      this.posts = response;
      console.log("posts", this.posts);
    }); // we dont need to handle error here we did it in globally
  }
  createPost(input: HTMLInputElement) {
    let post = { title: input.value }; //this is javascript object we know to convert js obj to Json object
    input.value = "";
    this.service.createPost(post).subscribe(
      (response) => {
        // post.id=response;
        post["id"] = response["id"];
        // console.log('posted data',response);
        this.posts.splice(0, 0, post); //add at begiing of array first zero postion ,second zero no delete, element want to place
        console.log("posted data", response["id"]);
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
    post["title"] = "Post On C++";
    //  instead of using /post
    // use specific /post/1
    //  use for only if few properties need to be update
    this.service.updatePost(post).subscribe((response) => {
      //  updatedPost['id']=response['id']
      //  updatedPost['id']=response['id']
      console.log("Patch", response);
      //  this.posts.splice(index,0,updatedPost);
      this.posts.splice(index, 1, post);
      // console.log('after',updatedPost);
      console.log("after", post);
    }); // we dont need to handle error here we did it in globally
    //  use this for to update entire object
    //  this.http.put(this.apiUrl,JSON.stringify(post));
  }

  deletePost(post) {
    this.service.deletePost(post["id"]).subscribe(
      (response) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        //  doesnot return anything
        console.log("removed", response);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert("this post has already been deleted.");
        else throw error; // rethrow an error
      }
    );
  }
}
```

## Extracting Reusable Error Handling Method

`post-service.ts`

```ts
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppError } from "../common/app-errors";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
// import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: "root",
})
export class PostService {
  private apiUrl = "https://jsonplaceholder.typicode.com/posts";
  private apiUrl2 = "http://www.omdbapi.com/?apikey=dfe6d885&s=cars";
  constructor(private http: HttpClient) {}

  getPosts() {
    // return this.http.get(this.apiUrl2).toPromise();
    return this.http.get(this.apiUrl).pipe(catchError(this.handleError));
  }
  createPost(post) {
    return this.http
      .post(this.apiUrl, JSON.stringify(post))
      .pipe(catchError(this.handleError));
  }
  updatePost(post) {
    return this.http
      .patch(this.apiUrl + "/" + post.id, JSON.stringify(post))
      .pipe(catchError(this.handleError));
  }

  deletePost(id) {
    return this.http.delete(this.apiUrl + "/" + id).pipe(
      catchError(this.handleError) // simply passing reference
    ); //here we dont have body of the request;
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404) return throwError(new NotFoundError());

    // return Observable.throw(new AppError(error));
    return throwError(new AppError(error));
  }
}
```

## Extracting Reusable Data Service

so far our post service is pretty good shape
in real world we will have often 10 services or more
there we have implement the same logic get post update handleError

- so we gonna extract a resuable service for working with http service

https://stackoverflow.com/questions/60801513/angular-9-error-ng2003-no-suitable-injection-token-for-parameter-url-of-cla

- we can even remove injectable and also @Inject(String) in constructor

`services/data-service.ts`

```ts
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppError } from "../common/app-errors";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
import { Inject } from "@angular/core";

// import 'rxjs/add/observable/throw';
//  we can even remove injectable and also @Inject(String) in constructor
@Injectable({
  providedIn: "root",
})
export class DataService {
  //  this class gonnabe reusable so here we dont need intialization
  constructor(@Inject(String) private url: string, private http: HttpClient) {}
  //  instead of getPosts getAll
  getAll() {
    // return this.http.get(this.apiUrl2).toPromise();
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }
  create(resource) {
    return this.http
      .post(this.url, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }
  update(resource) {
    return this.http
      .patch(this.url + "/" + resource.id, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }
  //  delete always take id so we dont need to rename param
  delete(id) {
    return this.http.delete(this.url + "/" + id).pipe(
      catchError(this.handleError) // simply passing reference
    ); //here we dont have body of the request;
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404) return throwError(new NotFoundError());

    // return Observable.throw(new AppError(error));
    return throwError(new AppError(error));
  }
}
```

`posts.service.ts`

```ts
import { DataService } from "./data.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

// import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: "root",
})
export class PostService extends DataService {
  private apiUrl = "https://jsonplaceholder.typicode.com/posts";
  // private apiUrl2 = 'http://www.omdbapi.com/?apikey=dfe6d885&s=cars';

  // remove private for http
  constructor(http: HttpClient) {
    // first we need to craete DataService object
    super("https://jsonplaceholder.typicode.com/posts", http); // creating instance of base class and passing derived class instance
  }
}
```

`posts.component.ts`

```ts
import { Component, OnInit } from "@angular/core";
import { AppError } from "../common/app-errors";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
import { PostService } from "../services/post.service";

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
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
    input.value = "";
    this.service.create(post).subscribe(
      (response) => {
        // post.id=response;
        post["id"] = response["id"];
        // console.log('posted data',response);
        this.posts.splice(0, 0, post); //add at begiing of array first zero postion ,second zero no delete, element want to place
        console.log("posted data", response["id"]);
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
    post["title"] = "Post On C++";
    //  instead of using /post
    // use specific /post/1
    //  use for only if few properties need to be update
    this.service.update(post).subscribe((response) => {
      //  updatedPost['id']=response['id']
      //  updatedPost['id']=response['id']
      console.log("Patch", response);
      //  this.posts.splice(index,0,updatedPost);
      this.posts.splice(index, 1, post);
      // console.log('after',updatedPost);
      console.log("after", post);
    }); // we dont need to handle error here we did it in globally
    //  use this for to update entire object
    //  this.http.put(this.apiUrl,JSON.stringify(post));
  }

  deletePost(post) {
    this.service.delete(post["id"]).subscribe(
      (response) => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        //  doesnot return anything
        console.log("removed", response);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert("this post has already been deleted.");
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
      console.log("posts", this.posts);

      // console.log(response[0])
    }); // we dont need to handle error here we did it in globally
  }
}
```

## The Map OPerator

data service to cleanup posts componet http related logic

`post-servicce`

```ts
import { Component, OnInit } from "@angular/core";
import { AppError } from "../common/app-errors";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
import { PostService } from "../services/post.service";

@Component({
  selector: "posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
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
    input.value = "";
    this.service.create(post).subscribe(
      (newPost) => {
        // post.id=response;
        // newPost.json()['id'];
        post["id"] = newPost["id"];
        // console.log('posted data',response);
        this.posts.splice(0, 0, post); //add at begiing of array first zero postion ,second zero no delete, element want to place
        console.log("posted data", newPost["id"]);
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
    post["title"] = "Post On C++";
    //  instead of using /post
    // use specific /post/1
    //  use for only if few properties need to be update
    this.service.update(post).subscribe((updatedPost) => {
      //  updatedPost['id']=response['id']
      //  updatedPost['id']=response['id']
      console.log("Patch", updatedPost);
      //  this.posts.splice(index,0,updatedPost);
      this.posts.splice(index, 1, post);
      // console.log('after',updatedPost);
      console.log("after", post);
    }); // we dont need to handle error here we did it in globally
    //  use this for to update entire object
    //  this.http.put(this.apiUrl,JSON.stringify(post));
  }

  deletePost(post) {
    this.service.delete(post["id"]).subscribe(
      // we dont get any repsosne so empyt
      () => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        //  doesnot return anything
        console.log("removed");
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert("this post has already been deleted.");
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
    this.service.getAll().subscribe((posts) => {
      // console.log(response)
      this.posts = posts;
      console.log("posts", this.posts);

      // console.log(response[0])
    }); // we dont need to handle error here we did it in globally
  }
}
```

`data servie`

```ts
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AppError } from "../common/app-errors";
import { BadInput } from "../common/bad-input";
import { NotFoundError } from "../common/not-found-error";
import { Inject } from "@angular/core";

// import 'rxjs/add/observable/throw';
//  we can even remove injectable and also @Inject(String) in constructor
@Injectable({
  providedIn: "root",
})
export class DataService {
  //  this class gonnabe reusable so here we dont need intialization
  constructor(@Inject(String) private url: string, private http: HttpClient) {}
  //  instead of getPosts getAll
  getAll() {
    // return this.http.get(this.apiUrl2).toPromise();
    return this.http.get(this.url).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }
  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource)).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }
  update(resource) {
    return this.http
      .patch(this.url + "/" + resource.id, JSON.stringify(resource))
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }
  //  delete always take id so we dont need to rename param
  delete(id) {
    return this.http.delete(this.url + "/" + id).pipe(
      map((response) => response),
      catchError(this.handleError) // simply passing reference
    ); //here we dont have body of the request;
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404) return throwError(new NotFoundError());

    // return Observable.throw(new AppError(error));
    return throwError(new AppError(error));
  }
}
```

## Optimistic vs Pesimistic Updates

Hopeful Hopeless

optimistic update will first update on ui if success on backend we leave it else will rollback to original state. nowadays lot of application uses this approach

pesimistic call to backend server wait for response and update data if fails fails

```ts
  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    this.posts.splice(0, 0, post); // optimistic updates add at begiing of array first zero postion ,second zero no delete, element want to place

    input.value = '';

    this.service.create(post).subscribe(
      (newPost) => {
        post['id'] = newPost['id'];
        console.log('posted data', newPost['id']);
      },
      (error: AppError) => {
        this.posts.splice(0, 1); // if something goes wrong will delete


        if (error instanceof BadInput) {
          // this.form.setErrors(error.originalError);
        } else throw error;
      }
    );
  }

  deletePost(post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post['id']).subscribe(
      // we dont get any repsosne so empyt
      () => {
        //  doesnot return anything
        console.log('removed');
      },
      (error: AppError) => {
        this.posts.splice(index, 0, post); // if something goes wrong will delete

        if (error instanceof NotFoundError)
          alert('this post has already been deleted.');
        else throw error; // rethrow an error
      }
    );
  }
```
