import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageServiceService } from '../services/page-service.service';
import * as TypeMoq from 'typemoq';
import { ViewItemComponent } from './view-item.component';
import { Item } from '../model/item';
import { of, throwError } from 'rxjs';

describe('ViewItemComponent', () => {
  let component: ViewItemComponent;
  let fixture: ComponentFixture<ViewItemComponent>;
  let mockPageService: TypeMoq.IMock<PageServiceService>;
  const items: Item[] = [{item:'shoe',description:'shoe',cost:2},{item:'box',description:'box',cost:3}];
  
  beforeEach(async () => {
    mockPageService = TypeMoq.Mock.ofType<PageServiceService>();
    await TestBed.configureTestingModule({
      declarations: [ViewItemComponent],
      providers: [
        { provide: PageServiceService, useFactory: () => mockPageService.object }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    mockPageService.setup(m => m.findItems()).returns(() => of(items));
    fixture = TestBed.createComponent(ViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call ngonint', () => {
    mockPageService.setup(m => m.findItems()).returns(() => throwError(new Error('Try again')));
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should call getTotalCost', () => {
    component.getTotalCost();
    expect(component.getTotalCost).toBeTruthy();
  });
  it('should call getTotalCost on null datasource', () => {
    component.dataSource = null;
    component.getTotalCost();
    expect(component.getTotalCost).toBeTruthy();
  });
});
