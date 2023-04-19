import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPreviewCardComponent } from './author-preview-card.component';

describe('AuthorPreviewCardComponent', () => {
  let component: AuthorPreviewCardComponent;
  let fixture: ComponentFixture<AuthorPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorPreviewCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
