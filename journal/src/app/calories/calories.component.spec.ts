import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesComponent } from './calories.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CaloriesComponent', () => {
  let component: CaloriesComponent;
  let fixture: ComponentFixture<CaloriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, CaloriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
