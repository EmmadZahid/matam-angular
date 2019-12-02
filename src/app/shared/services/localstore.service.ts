import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalstoreService{

    setItem(key:LocalstoreKey, value:string | any[]){
        localStorage.setItem(key, JSON.stringify(value))
    }

    getItem(key:LocalstoreKey):any{
        let value:string = localStorage.getItem(key)
        if (value) {
            try{
                value = JSON.parse(value)
            } catch(e){
                value = null
            }
            return value;
        }
        return value
    }
}

export enum LocalstoreKey{
    Token = 'Token',
    Users = 'Users'
}