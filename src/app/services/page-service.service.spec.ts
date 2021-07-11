import { HttpBackend, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as TypeMoq from 'typemoq';
import { PageServiceService } from './page-service.service';

describe('PageServiceService', () => {
  let service: PageServiceService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let mockHttpClient: TypeMoq.IMock<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageServiceService],
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    service = new PageServiceService(httpClient);
    mockHttpClient = TypeMoq.Mock.ofType<HttpClient>();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return items', () => {
    const result = [{ item: 'shoe', cost: 2, description: 'shoe' }];
    service.findItems().subscribe(data => { });
    const req = httpMock.expectOne('http://localhost:9000/api/items');
    expect(req.request.method).toBe('GET');
    req.flush(result);
  });

  it('should add items', () => {
    const result = { item: 'shoe', cost: 2, description: 'shoe' };
    const response = { message: 'done' };
    service.addItem(result).subscribe(data => { });
    const req = httpMock.expectOne('http://localhost:9000/api/add');
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });
  it('should modify items', () => {
    const result = { item: 'shoe', cost: 2, description: 'shoe' };
    const response = { message: 'done' };
    service.modifyItem(result).subscribe(data => { });
    const req = httpMock.expectOne('http://localhost:9000/api/modify');
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });
  it('should delete items', () => {
    const response = { message: 'done' };
    service.deleteItem('shoe').subscribe(data => { });
    const req = httpMock.expectOne('http://localhost:9000/api/delete/shoe');
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });
});
