import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

import { AppValidators } from 'src/app/shared/services/app-validators.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { homeRoutesNames } from 'src/app/home/home-routes.names';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs:SubSink = new SubSink()
  public form: FormGroup
  public disableLoginButton:boolean
  public maxLength:number = 50
  public minLength:number = 6
  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        AppValidators.maxLengthAndTrimValidator(this.maxLength),
        AppValidators.emptyFieldValidator()
      ]),
      'password': new FormControl('', [
        Validators.required,
        AppValidators.minLengthAndTrimValidator(this.minLength),
        AppValidators.maxLengthAndTrimValidator(this.maxLength),
        AppValidators.emptyFieldValidator()
      ])
    })
    this.subs.add(
      this.form.valueChanges.subscribe( updates =>{
        if(this.form.controls['password'].hasError('serverError')){
          this.form.reset(this.form.value);
        }
      })
    )
  }

  onLoginClick() {
    if(!this.form.invalid){
      this.disableLoginButton = true
      this.form.disable()

      let email:string = this.form.controls['email'].value
      let password:string = this.form.controls['password'].value
      
      this.subs.add(
        this.authService.login(email, password).subscribe(
          (data:string)=>{
            console.log(data)
            this.disableLoginButton = false
            this.router.navigateByUrl(homeRoutesNames.HOME)
          }, error =>{
            this.form.enable()
            this.form.controls['password'].setErrors({
              serverError: error
            })
            console.log(error)
            this.disableLoginButton = false
          }
        )
      )
    }
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }
}
