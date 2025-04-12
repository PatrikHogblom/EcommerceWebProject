import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PostCategoryComponent } from './admin/components/post-category/post-category.component';
import { PostProductComponent } from './admin/components/post-product/post-product.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';

export const routes: Routes =
[
    {path: 'login', component: LoginComponent},
//    {path: 'register', component: SignupComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'userprofile', component: UserprofileComponent},
    {path: 'update/:id', component: UpdateuserComponent},
    {path: 'category', component: PostCategoryComponent},
    {path: 'product', component: PostProductComponent},

    //{path: 'register', component: XnameComponent, canActivate: [usersGuard, adminGuard]},
    // {path: 'customer', loadChildren () => import("./customer/customer.module").then(m => m.CustomerModule)},
    // {path: 'admin', loadChildren () => import("./admin/admin.module").then(m => m.AdminModule)}
];
