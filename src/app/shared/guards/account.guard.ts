import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { homeRoutesNames } from 'src/app/home/home-routes.names';

@Injectable({providedIn: 'root'})
export class AccountGuard implements CanActivate{
    constructor(private authService:AuthService,
        private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let p = new Promise<boolean>((resolve, reject) => {
            let isLoggedIn:boolean = this.authService.isUserLoggedIn()
            if(!isLoggedIn){
                resolve(true)
            } else{
                //Implement redirectUrl thing..
                this.router.navigateByUrl(homeRoutesNames.HOME)
                reject(false)
            }
        })

        return p
    }
}