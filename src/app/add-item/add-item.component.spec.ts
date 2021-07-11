import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import * as TypeMoq from 'typemoq';
import { PageServiceService } from '../services/page-service.service';
import { AddItemComponent } from './add-item.component';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let formGroup: FormGroup;
  let mockFormBuilder: TypeMoq.IMock<FormBuilder>;
  let mockPageService: TypeMoq.IMock<PageServiceService>;
  const formBuilder = new FormBuilder();
  formGroup = formBuilder.group({
    'item': [null],
    'cost': [null],
    'description': [null]
  });

  beforeEach(async () => {
    mockFormBuilder = TypeMoq.Mock.ofType<FormBuilder>();
    mockPageService = TypeMoq.Mock.ofType<PageServiceService>();
    await TestBed.configureTestingModule({
      declarations: [AddItemComponent],
      providers: [
        { provide: PageServiceService, useFactory: () => mockPageService.object },
        { provide: FormBuilder, useFactory: () => mockFormBuilder.object }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockFormBuilder.setup(x => x.group(TypeMoq.It.isAny())).returns(() => formGroup);
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit', () => {
    let result = {
      message: "Success"
    }
    mockPageService.setup(m => m.addItem(TypeMoq.It.isAny())).returns(() => of(result));
    component.onSubmit({ item: 'shoe', description: 'shoes', cost: 2 });
    expect(component.onSubmit).toBeTruthy();
  });
  it('should not onSubmit', () => {
    mockPageService.setup(m => m.addItem(TypeMoq.It.isAny())).returns(() => throwError(new Error('Try again')));
    component.onSubmit({ item: 'shoe', description: 'shoes', cost: 2 });
    expect(component.onSubmit).toBeTruthy();
  });
});
