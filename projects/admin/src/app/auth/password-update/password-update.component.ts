import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordUpdateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
