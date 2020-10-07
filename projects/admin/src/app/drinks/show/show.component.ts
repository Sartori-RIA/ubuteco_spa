import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Drink} from '../../core/models/drink';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {

  constructor(public dialogRef: MatDialogRef<ShowComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Drink) {
  }

}
