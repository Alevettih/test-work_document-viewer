import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextedComponent } from './contexted.component';

describe('ContextedComponent', () => {
  let component: ContextedComponent;
  let fixture: ComponentFixture<ContextedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
