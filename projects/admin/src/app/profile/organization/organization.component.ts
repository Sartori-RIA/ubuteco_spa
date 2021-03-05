import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {ActivatedRoute} from '@angular/router';
import {Organization} from '../../core/models/organization';
import {CookieCodeValidators} from '../../shared/validators/cookie-code.validators';
import {OrganizationsService} from '../../core/services/api/organizations.service';
import {UPDATE_ORGANIZATION} from '../../store/auth/auth.actions';
import {Observable} from 'rxjs';
import {canEditOrganization} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  form: FormGroup = this.mountForm();
  canEdit$: Observable<boolean> = this.store.pipe(select(canEditOrganization));
  organization: Organization = this.activatedRoute.snapshot.data.organization;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private organizationService: OrganizationsService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.organization = this.activatedRoute.snapshot.data.organization;
    this.updateForm();
    this.canEdit$.subscribe((can) => {
      if (!can) {
        this.form.disable();
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const organization: Organization = this.form.value;
      this.store.dispatch(UPDATE_ORGANIZATION({data: organization}));
    } else {
      this.form.markAllAsTouched();
    }
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      cnpj: [null, [Validators.required, CookieCodeValidators.cnpj], [CookieCodeValidators.uniqueCNPJ(this.organizationService)]],
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.organization?.id,
      phone: this.organization?.phone,
      name: this.organization?.name,
      cnpj: this.organization?.cnpj
    });
  }
}
