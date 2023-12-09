import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemComponent } from './food-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FoodItemComponent', () => {
  let component: FoodItemComponent;
  let fixture: ComponentFixture<FoodItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FoodItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
