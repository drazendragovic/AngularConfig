import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIToolbarComponent } from './ui-toolbar.component';

describe('DynamicToolbarComponent', () => {
  let component: UIToolbarComponent;
  let fixture: ComponentFixture<UIToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UIToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UIToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
