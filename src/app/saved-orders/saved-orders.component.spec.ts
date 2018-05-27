import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedOrdersComponent } from './saved-orders.component';

describe('SavedOrdersComponent', () => {
  let component: SavedOrdersComponent;
  let fixture: ComponentFixture<SavedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
