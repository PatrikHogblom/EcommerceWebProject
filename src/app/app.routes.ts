import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';

export const routes: Routes =
[
    {path: 'login', component: LoginComponent},
//    {path: 'register', component: SignupComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'updateuser', component: UpdateuserComponent},

    //{path: 'register', component: XnameComponent, canActivate: [usersGuard, adminGuard]},
    // {path: 'customer', loadChildren () => import("./customer/customer.module").then(m => m.CustomerModule)},
    // {path: 'admin', loadChildren () => import("./admin/admin.module").then(m => m.AdminModule)}
];
