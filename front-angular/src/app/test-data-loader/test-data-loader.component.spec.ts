import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDataLoaderComponent } from './test-data-loader.component';

describe('TestDataLoaderComponent', () => {
  let component: TestDataLoaderComponent;
  let fixture: ComponentFixture<TestDataLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDataLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestDataLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
