import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppValidators } from 'src/app/shared/services/app-validators.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { authRoutesNames } from '../auth-routes.names';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,OnDestroy {
  private subs:SubSink = new SubSink()
  public form: FormGroup
  public disableSignupButton:boolean
  public maxLength:number = 50
  public minLength:number = 6
  constructor(private authService:AuthService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'fullname': new FormControl('', [
        Validators.required,
        AppValidators.minLengthAndTrimValidator(this.minLength),
        AppValidators.maxLengthAndTrimValidator(this.maxLength),
        AppValidators.emptyFieldValidator()
      ]),
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
      this.form.controls['email'].valueChanges.subscribe( updates =>{
        if(this.form.controls['email'].hasError('serverError')){
          this.form.reset(this.form.value);
        }
      })
    )
  }

  onSignupClick() {
    if(!this.form.invalid){
      this.disableSignupButton = true
      this.form.disable()

      let fullname:string = this.form.controls['fullname'].value
      let email:string = this.form.controls['email'].value
      let password:string = this.form.controls['password'].value
      
      this.subs.add(
        this.authService.signup(fullname, email, password).subscribe(
          (data:string)=>{
            this.router.navigate(['../', authRoutesNames.LOGIN], {relativeTo: this.activatedRoute})
          }, error =>{
            this.form.enable()
            this.form.controls['email'].setErrors({
              serverError: error
            })
            console.log(error)
            this.disableSignupButton = false
          }
        )
      )
    }
  }

  ngOnDestroy(){
    
  }

}
