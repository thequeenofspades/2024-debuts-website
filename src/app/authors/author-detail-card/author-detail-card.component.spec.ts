import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailCardComponent } from './author-detail-card.component';

describe('AuthorDetailCardComponent', () => {
  let component: AuthorDetailCardComponent;
  let fixture: ComponentFixture<AuthorDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorDetailCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
