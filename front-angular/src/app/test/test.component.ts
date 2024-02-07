import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TestService } from '../test-service.service';
import { TestDataLoaderComponent } from '../test-data-loader/test-data-loader.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ReactiveFormsModule,TestDataLoaderComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  data: string[];
  userForm: FormGroup;

  constructor(private testService: TestService, private fb: FormBuilder) {
    this.data = this.testService.getData();

    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
    });
  }
}
