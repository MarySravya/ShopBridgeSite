import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'server/db-data';
import { PageServiceService } from '../services/page-service.service';

@Component({
  selector: 'app-modify-item',
  templateUrl: './modify-item.component.html',
  styleUrls: ['./modify-item.component.css']
})
export class ModifyItemComponent implements OnInit {
  message: string = '';
  items: Item[] = [];
  names: string[] = [];
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private pageService: PageServiceService) { }

  ngOnInit(): void {
    this.pageService.findItems().subscribe(data => {
      this.items = data;
      data.forEach(element => {
        this.names.push(element.item);
      });
    },(error) => {
      this.message = "Error, Try again."
    });
    this.formGroup = this.formBuilder.group({
      'item': [null, Validators.required],
      'cost': [null, [Validators.required]],
      'description': [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  showFields(name) {
    this.message = '';
    this.items.forEach(element => {
      if(element.item == name.value) {
        this.formGroup.controls.cost.setValue(element.cost);
        this.formGroup.controls.description.setValue(element.description);
      }
    });
  }
  onSubmit(value: Item) {
    this.pageService.modifyItem(value).subscribe(data => {
      this.message = data.message;
    },(error) => {
      this.message = "Error, Try again."
    });
  }

}
