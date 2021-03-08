import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {FeedbackService} from '../../core/services/api/feedback.service';

@Injectable()
export class EmployeesEffects {

  constructor(private actions$: Actions,
              private feedback: FeedbackService) {
  }
}
