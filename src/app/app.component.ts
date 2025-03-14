import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DemoAngularMaterialModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceWeb';
}
