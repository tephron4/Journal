import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterComponent } from './water.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WaterComponent', () => {
  let component: WaterComponent;
  let fixture: ComponentFixture<WaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, WaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
