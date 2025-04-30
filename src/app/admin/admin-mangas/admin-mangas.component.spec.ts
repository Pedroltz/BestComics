import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMangasComponent } from './admin-mangas.component';

describe('AdminMangasComponent', () => {
  let component: AdminMangasComponent;
  let fixture: ComponentFixture<AdminMangasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMangasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMangasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
