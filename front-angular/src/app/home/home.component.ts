import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TestComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) { }

  goToAbout() {
    this.router.navigate(['/about']);
  }

}
