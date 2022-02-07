import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCakeComponent } from './add-new-cake.component';

describe('AddNewCakeComponent', () => {
  let component: AddNewCakeComponent;
  let fixture: ComponentFixture<AddNewCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
