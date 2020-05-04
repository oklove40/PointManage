import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMenu } from '../menu.service';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit {

  form: FormGroup;
  description:string;
  menus: Array<IMenu> = [];
  menu: IMenu;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MenuViewComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log('dialog data : ', data);
    this.description = data.description;
    if(data.menus != null)
    {
      this.menu = data.menus[0];
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
