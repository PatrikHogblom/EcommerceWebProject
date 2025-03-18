import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "./footer/footer.component";
import { NavComponent } from './nav/nav.component';

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
}
