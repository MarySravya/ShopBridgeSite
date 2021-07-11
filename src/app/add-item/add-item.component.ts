import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'server/db-data';
import { PageServiceService } from '../services/page-service.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  message: string = '';
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private pageService: PageServiceService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'item': [null, Validators.required],
      'cost': [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      'description': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  onSubmit(value: Item) {
    this.pageService.addItem(value).subscribe(data => {
      this.message = data.message;
    },(error) => {
      this.message = "Error, Try again."
    });
  }
}
