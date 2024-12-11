import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageConstants } from "../common/storage-constants";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(StorageConstants.AuthenticationToken);

        if (token) {
            const authenticatedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });

            return next.handle(authenticatedRequest);
        }

        return next.handle(req);
    }
}