import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { authRoutesNames } from 'src/app/auth/auth-routes.names';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,
        private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let p = new Promise<boolean>((resolve, reject) => {
            let isLoggedIn:boolean = this.authService.isUserLoggedIn()
            if(isLoggedIn){
                resolve(true)
            } else{
                this.router.navigate([authRoutesNames.ACCOUNT, authRoutesNames.LOGIN])
                reject(false)
            }
        })

        return p
    }
}