import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsComponent } from './steps.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StepsComponent', () => {
  let component: StepsComponent;
  let fixture: ComponentFixture<StepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, StepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
