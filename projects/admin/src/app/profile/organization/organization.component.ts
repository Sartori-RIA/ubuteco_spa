import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../core/models/user';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {ActivatedRoute} from '@angular/router';
import {UPDATE_USER} from '../../store/auth/auth.actions';
import {Organization} from "../../core/models/organization";
import {CookieCodeValidators} from "../../shared/validators/cookie-code.validators";
import {OrganizationsService} from "../../core/services/api/organizations.service";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements AfterViewInit {

  form: FormGroup = this.mountForm();
  organization: Organization = this.activatedRoute.snapshot.data.organization;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private organizationService: OrganizationsService,
              private store: Store<AppState>) {
  }

  ngAfterViewInit(): void {
    this.organization = this.activatedRoute.snapshot.data.organization;
    this.updateForm();
  }

  onSubmit() {
    if (this.form.valid) {
      const organization: Organization = this.form.value;
      // this.store.dispatch(UPDATE_USER({user}));
    } else {
      this.form.markAllAsTouched();
    }
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      cnpj: [null, [Validators.required, CookieCodeValidators.cnpj], [CookieCodeValidators.uniqueCNPJ(this.organizationService)]],
    });
  }

  private updateForm() {
    console.log(this.activatedRoute.snapshot.data);
    this.form.patchValue({
      phone: this.organization?.phone,
      name: this.organization?.name,
      cnpj: this.organization?.cnpj
    });
  }
}
