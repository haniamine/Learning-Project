import {  CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-data-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-data-loader.component.html',
  styleUrl: './test-data-loader.component.scss',
})
export class TestDataLoaderComponent {
  @Input() data!: string[];
}
