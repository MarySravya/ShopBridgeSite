import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class PageServiceService {

  constructor(private http: HttpClient) { }

  findItems(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:9000/api/items').pipe(
      map(res => res["payload"])
    );
  }
  addItem(item: Item): Observable<any> {
    return this.http.post<any>('http://localhost:9000/api/add', item);
  }
  modifyItem(item: Item): Observable<any> {
    return this.http.post<any>('http://localhost:9000/api/modify', item);
  }
  deleteItem(name: string): Observable<any> {
    return this.http.delete<any>('http://localhost:9000/api/delete/'+name);
  }
}
