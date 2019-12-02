import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, retry, timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResturantInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let modifiedReq: any = req.clone({
            headers: req.headers.append('user-key', "dec1bd7924082ad7ba1f200d2ae774b8")
        })

        return next.handle(modifiedReq).pipe(
            timeout(60 * 1000), //60 sec timeout
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401) {
                }
                return throwError(error);
            }
        ))
    }
}