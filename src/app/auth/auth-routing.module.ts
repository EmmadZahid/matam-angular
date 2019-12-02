import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { AccountGuard } from '../shared/guards/account.guard';
import { authRoutesNames } from './auth-routes.names';

export const authRoutes: Routes = [
    { path: authRoutesNames.ACCOUNT, component: AuthComponent, canActivate:[AccountGuard], children:[
        { path: '', redirectTo: authRoutesNames.LOGIN, pathMatch: 'full' },
        { path: authRoutesNames.LOGIN, component: LoginComponent },
        { path: authRoutesNames.SIGNUP, component: SignupComponent }
    ] }
]

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }