import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../core/models/user';

import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../core/services/api/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  error: number;
  loading = false;
  user: User;
  subscription: Subscription;
  alreadyConfirmed: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    console.log('asd');
    this.loading = true;
    const params = this.activatedRoute.snapshot.queryParamMap.get('confirmation_token');
    this.subscription = this.authService
      .confirmAccount(params).subscribe((user) => {
        this.user = user;
        this.error = undefined;
        this.loading = false;
      }, (err: HttpErrorResponse) => {
        this.error = err.status;
        this.loading = false;
        this.alreadyConfirmed = !!err.error.email;
      });
  }

}
