import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { CommonModule } from '@angular/common';
import { MonthComponent } from './month.component';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [RouterModule, CommonModule, MonthComponent],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
})
export class HelloComponent {
  title = 'Todolist';
  routes = routes.filter((e) => (e.title !== 'Root'));
}
