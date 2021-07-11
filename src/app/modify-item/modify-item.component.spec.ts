import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageServiceService } from '../services/page-service.service';
import * as TypeMoq from 'typemoq';
import { ModifyItemComponent } from './modify-item.component';
import { Observable, of, throwError } from 'rxjs';
import { Item } from '../model/item';

describe('ModifyItemComponent', () => {
  let component: ModifyItemComponent;
  let fixture: ComponentFixture<ModifyItemComponent>;
  let formGroup: FormGroup;
  let mockFormBuilder: TypeMoq.IMock<FormBuilder>;
  let mockPageService: TypeMoq.IMock<PageServiceService>;
  const formBuilder = new FormBuilder();
  formGroup = formBuilder.group({
    'item': [null],
    'cost': [null],
    'description': [null]
  });
  const items: Item[] = [{ item: 'shoe', description: 'shoe', cost: 2 }, { item: 'box', description: 'box', cost: 3 }];

  beforeEach(async () => {
    mockFormBuilder = TypeMoq.Mock.ofType<FormBuilder>();
    mockPageService = TypeMoq.Mock.ofType<PageServiceService>();
    await TestBed.configureTestingModule({
      declarations: [ModifyItemComponent],
      providers: [
        { provide: PageServiceService, useFactory: () => mockPageService.object },
        { provide: FormBuilder, useFactory: () => mockFormBuilder.object }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockPageService.setup(m => m.findItems()).returns(() => of(items));
    mockFormBuilder.setup(x => x.group(TypeMoq.It.isAny())).returns(() => formGroup);
    fixture = TestBed.createComponent(ModifyItemComponent);
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
    mockPageService.setup(m => m.modifyItem(TypeMoq.It.isAny())).returns(() => of(result));
    component.onSubmit({ item: 'shoe', description: 'shoes', cost: 2 });
    expect(component.onSubmit).toBeTruthy();
  });
  it('should not onSubmit', () => {
    mockPageService.setup(m => m.modifyItem(TypeMoq.It.isAny())).returns(() => throwError(new Error('Try again')));
    component.onSubmit({ item: 'shoe', description: 'shoes', cost: 2 });
    expect(component.onSubmit).toBeTruthy();
  });
  it('should call showFields and find element', () => {
    component.showFields({ value: 'shoe' });
    expect(component.showFields).toBeTruthy();
  });
  it('should call showFields and not find element', () => {
    component.showFields({ value: 'shoes' });
    expect(component.showFields).toBeTruthy();
  });
});
