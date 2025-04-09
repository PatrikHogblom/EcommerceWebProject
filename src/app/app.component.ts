import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "./footer/footer.component";
import { NavComponent } from './nav/nav.component';
import { UserStorageService } from './services/storage/user-storage.service';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DemoAngularMaterialModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    NavComponent,

],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceWeb';

  isUserLoggedIn : boolean = UserStorageService.isUserLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router){}

  ngOnInit() {
    this.router.events.subscribe(e => {
      this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }

}
