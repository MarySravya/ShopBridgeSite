import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../model/item';
import { PageServiceService } from '../services/page-service.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  displayedColumns: string[] = ['item', 'cost', 'description'];
  dataSource: MatTableDataSource<Item>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private pageService: PageServiceService) { }

  ngOnInit(): void {
    this.pageService.findItems().subscribe(data => {
      this.dataSource = new MatTableDataSource<Item>(data);
      this.dataSource.paginator = this.paginator;
    },(error) => {
      console.log("Error, Try again.");
    });
  }
  getTotalCost() {
    return this.dataSource?.data?.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}