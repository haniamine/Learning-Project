import { Component } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [TestComponent,RouterModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})
export class TestFormComponent {

}
