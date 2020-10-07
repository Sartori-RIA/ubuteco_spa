import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {noop} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  form: FormGroup = this.mountForm();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    noop();
  }

  private mountForm(): FormGroup {
    return this.fb.group({});
  }
}
