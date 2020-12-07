import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../admin/shared/services/auth.service';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setParams: {
          auth: this.auth.token
        }
      });
    }
    return next.handle(request)
      .pipe(
        // tap(() => {
        //     console.log('Intercept');
        //   }
        // ),
        catchError((error: HttpErrorResponse) => {
          console.log('[Interceptor Error: ]', error);
          if (error.status === 401) {
            this.auth.logout();
            this.router.navigate(['/admin', 'login'], {
              queryParams: {authFailed: true}
            });
          }
          return throwError(error);
        })
      );
  }
}
