import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule, FormControl, AbstractControl } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authRoutes } from '../auth-routing.module';
import { Router, NavigationEnd } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { LoginComponent } from '../login/login.component';
import { authRoutesNames } from '../auth-routes.names';

fdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let fullName:AbstractControl;
  let email:AbstractControl
  let password:AbstractControl
  let router:Router
  let location:Location

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, AuthComponent, LoginComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        RouterTestingModule.withRoutes(authRoutes),
        BrowserAnimationsModule,
        SharedModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fullName = component.form.controls['fullname']
    email = component.form.controls['email']
    password = component.form.controls['password']

    router = TestBed.get(Router)
    // location = TestBed.get(Location)
    router.initialNavigation()
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show invalid form when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should show invalid form when any field empty', () => {
    email.setValue('test@test.com')
    fullName.setValue('Kabib Nurmegomeda')
    expect(component.form.valid).toBeFalsy();

    email.setValue('test@test.com')
    fullName.setValue('')
    password.setValue('123123123')
    expect(component.form.valid).toBeFalsy();

    email.setValue('')
    fullName.setValue('Kabib Nurmegomeda')
    password.setValue('123123123')
    expect(component.form.valid).toBeFalsy();
  });
  
  it('should show email field required', () => {
    let errors = {}
    errors = email.errors
    expect(errors['required']).toBeTruthy()
  });

  it('should show email invalid', () => {
    email.setValue('test.com')

    let errors = {}
    errors = email.errors || {}
    expect(errors['email']).toBeTruthy()
  });
  
  it('should show email valid', () => {
    email.setValue('test@test.com')

    let errors = {}
    errors = email.errors || {}
    expect(errors['email']).toBeFalsy()
  });


  it('should show fullname field required', () => {
    let errors = {}
    errors = fullName.errors || {}
    expect(errors['required']).toBeTruthy()
  });

  it('should show fullname field min length', () => {
    fullName.setValue('abc')
    
    let errors = {}
    errors = fullName.errors || {}
    expect(errors['minLength']).toBeTruthy()
  });

  it('should show fullname field max length', () => {
    fullName.setValue('Contrary to popular belief, Lorem Ipsum is not simply random text.Contrary to popular belief, Lorem Ipsum is not simply random text.Contrary to popular belief, Lorem Ipsum is not simply random text.')
    
    let errors = {}
    errors = fullName.errors || {}
    expect(errors['maxLength']).toBeTruthy()
  });

  it('should show fullname field valid', () => {
    fullName.setValue('Conor McGregor')
    
    let errors = {}
    errors = fullName.errors || {}
    expect(fullName.valid).toBeTruthy()
  });

  it('should singup a user', fakeAsync(() => {
    router.navigate([authRoutesNames.ACCOUNT,authRoutesNames.SIGNUP])

    fullName.setValue('Conor McGregor')
    email.setValue('test@test.com')
    password.setValue('123123123')
    component.onSignupClick()
    
    tick(1000)
    expect(router.url).toBe('/' + authRoutesNames.ACCOUNT + '/' + authRoutesNames.SIGNUP)
  }));

  it('should not allow registering already registered user', fakeAsync(() => {
    fullName.setValue('Conor McGregor')
    email.setValue('test@test.com')
    password.setValue('123123123')
    component.onSignupClick()
    tick()
    router.navigate([authRoutesNames.ACCOUNT,authRoutesNames.SIGNUP])
    tick()
    
    
    fullName.setValue('Conor McGregor')
    email.setValue('test@test.com')
    password.setValue('123123123')
    component.onSignupClick()
    
    tick(1000)

    let error = {}
    error = email.errors || {}
    console.log(error)
    expect(error['serverError']).toBeTruthy()
  }));
  

  it('should navigate to login page on link click', fakeAsync(() => {
    let compiled = fixture.debugElement.nativeElement
    compiled.querySelector('a').click()
    tick()
    expect(router.url).toBe('/' + authRoutesNames.ACCOUNT + '/' + authRoutesNames.LOGIN)
  }));

});
