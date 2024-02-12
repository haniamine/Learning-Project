import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-month-display',
  standalone: true,
  template: `<p>Birthday is {{ getMonthName(this.birthday) }}</p>`, // January
})
export class MonthComponent {
  birthday = new Date();

  getMonthName(date: Date): string {
    return date.toLocaleString('en-US',  { month: 'long' });
  }
  
}
