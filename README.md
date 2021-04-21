# AngularHttpServiceLearnings
https://jsonplaceholder.typicode.com/

## Getting data
https://jsonplaceholder.typicode.com/posts

HttpClient will help us fetch external data, post to it, etc. We need to import the http module to make use of the http service. Let us consider an example to understand how to make use of the http service.

 - first step is use http service go to `app.module.ts`
 - inside imports [HttpClientModule] import new Module HttpClientModule

- we use observable and promises to work with non-blocking or asynchronous operations
- we go over network we gonna call this server and data is not avaiable on immediately there may some delay
- during this time we dont want our main thread  which is executing the code get blocked
- we use promises and observables with this classes when the result is ready will be notified
- **observable has method called subscribe** see the below code we chain the observable method
- which means subscribing observable
```js 
http.get(this.apiUrl);//return type is observable of response
http.get(this.apiUrl).subscribe()
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
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts;

  apiUrl='https://jsonplaceholder.typicode.com/posts';
  constructor(http:HttpClient) {
    // http.get(this.apiUrl);//return type is object
    http.get(this.apiUrl).subscribe(response=>{
      // console.log(response)
      this.posts=response;
      console.log("posts",this.posts);
      
      // console.log(response[0])
    })
   }
  ngOnInit(): void {
  }

}
```

`app.component.html`
```html
<div class="container">
    <ul class="list-group">
        <li *ngFor="let post of posts"
        class="list-group-item">
                {{post.title}}
        </li>
    </ul>
</div>
```