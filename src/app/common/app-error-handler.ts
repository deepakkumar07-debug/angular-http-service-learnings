// defualt handleError() will print it on console

import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // throw new Error('Method not implemented.');

    // In future instead of alert we can toast it to the user
    // Instead of console.log log it in a server

    alert('An unexpected error occured');
    console.log('deleteError', error);
  }
}
