import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  getData(): string[] {
    return ['data1', 'data2', 'data3'];
  }
}