import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedplaylistComponent } from './selectedplaylist.component';

describe('SelectedplaylistComponent', () => {
  let component: SelectedplaylistComponent;
  let fixture: ComponentFixture<SelectedplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedplaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
