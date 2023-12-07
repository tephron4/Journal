import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayComponent } from './day.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
