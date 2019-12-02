export class User{
    public fullname:string
    public email:string
    public password:string
    constructor(data?:any){
        if(!data){
            return
        }
        for(let prop in data){
            this[prop] = data[prop]
        }
    }
}