import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError ,from } from 'rxjs';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpUserEvent, HttpResponse } from '@angular/common/http';
import { tap, scan } from 'rxjs/operators';
import { UserService } from '../shared/Services/user.service';
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  // Common Task Of Implememdted class 'HttpInterceptor'
  // All Http Request will path through this interceptor to take accessToken
  // some requests doesn't need authorization so i need to check the request header if 'Auth' or 'Not'
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
    //else if (req.url.indexOf('eta.gov.eg') > 0) {
    //  console.log(req.headers);
    //  return next.handle(req.clone());  
    //}
    if (localStorage.getItem('userToken') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
      });
      return next.handle(clonedreq).pipe(
        tap(
          //succ => { console.log(succ); },
          succ => { },
          err => {
            if (err.status === 401) {
              this.router.navigateByUrl('/login');
            }
            else if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.error('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.error('Backend returned code ${err.status}, body was: ${err.error}');
            }

            return throwError(
              'Something bad happened; please try again later.');
          }

          
        ));
    }
    // if the request doesn't have token in local storage the redirect the user to login page
    this.router.navigateByUrl('/login');
  

  }
}
