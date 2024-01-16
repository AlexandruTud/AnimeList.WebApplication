import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourlistComponent } from './yourlist.component';

describe('YourlistComponent', () => {
  let component: YourlistComponent;
  let fixture: ComponentFixture<YourlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
