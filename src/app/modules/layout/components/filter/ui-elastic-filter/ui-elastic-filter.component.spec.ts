import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIElasticFilterComponent } from './ui-elastic-filter.component';

describe('UIElasticFilterComponent', () => {
  let component: UIElasticFilterComponent;
  let fixture: ComponentFixture<UIElasticFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UIElasticFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UIElasticFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
