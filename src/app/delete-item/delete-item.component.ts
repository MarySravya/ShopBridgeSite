import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../model/item';
import { PageServiceService } from '../services/page-service.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  message: string = '';
  items: Item[] = [];
  names: string[] = [];
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private pageService: PageServiceService) { }

  ngOnInit(): void {
    this.pageService.findItems().subscribe(data => {
      this.items = data;
    },(error) => {
      this.message = "Error, Try again."
    });
    this.formGroup = this.formBuilder.group({
      'item': [null, Validators.required]
    });
  }
  onSubmit(value) {
    this.pageService.deleteItem(value.item).subscribe(data => {
      this.message = data.message;
    },(error) => {
      this.message = "Error, Try again."
    });
  }

}
