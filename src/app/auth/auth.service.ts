import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstoreService, LocalstoreKey } from '../shared/services/localstore.service';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { authRoutesNames } from './auth-routes.names';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private loggedInUser:User
    constructor(private localstoreService: LocalstoreService,
        private router:Router) {
            let token:string = this.localstoreService.getItem(LocalstoreKey.Token)
            if(token){
                let users: User[] = this.getAllUsers()
                for (let user of users) {
                    if (user.email == token) {
                        this.loggedInUser = user
                    }
                }
            }
        }

    login(email: string, password: string):Observable<string>{
        return Observable.create(observer => {
            setTimeout(() => {
                let users: User[] = this.getAllUsers()
                let message:string = 'Incorrect email/password.'
                if (users) {
                    let allow: boolean
                    for (let user of users) {
                        if (user.email == email && user.password == password) {
                            this.loggedInUser = user
                            allow = true
                            break
                        }
                    }
                    if (allow) {
                        this.localstoreService.setItem(LocalstoreKey.Token, email)
                        observer.next('success')
                    } else {
                        observer.error(message)
                    }
                } else{
                    observer.error(message)
                }
            }, 500);
        })
    }

    signup(fullname:string, email:string, password:string):Observable<string>{
        return Observable.create(observer => {
            setTimeout(() => {
                let users: User[] = this.getAllUsers()
                let message:string = 'Email already registered.'
                if (users) {
                    let allow: boolean = true
                    for (let user of users) {
                        if (user.email == email) {
                            allow = false
                            break
                        }
                    }
                    if (allow) {
                        let user:User = new User({
                            fullname: fullname,
                            email: email,
                            password: password
                        })
                        users.push(user)
                        this.localstoreService.setItem(LocalstoreKey.Users, users)
                        observer.next('success')
                    } else {
                        observer.error(message)
                    }
                } else{
                    observer.next('success')
                }
            }, 500);
        })
    }

    isUserLoggedIn():boolean{
        let token:string = this.localstoreService.getItem(LocalstoreKey.Token)
        if(token){
            let users: User[] = this.getAllUsers()
            for (let user of users) {
                if (user.email == token) {
                    return true
                }
            }
            
            return false
        } else{
            return false
        }
    }


    logout(){
        this.loggedInUser = null
        this.localstoreService.setItem(LocalstoreKey.Token,'')
        this.router.navigate([authRoutesNames.ACCOUNT, authRoutesNames.LOGIN])
    }

    getLoggedInUser():User{
        if(this.loggedInUser)
            return <User>{...this.loggedInUser}
        return null
    }
    //***********************
    //  Helper methods
    //***********************

    private getAllUsers(): User[] {
        let users: any[] = this.localstoreService.getItem(LocalstoreKey.Users)
        if (users) {
            users.map((item: any) => {
                let user: User = new User(item)
                return user
            })
            return users
        }
        return []
    }
}