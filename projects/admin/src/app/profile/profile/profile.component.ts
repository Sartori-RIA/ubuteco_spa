import {Component} from '@angular/core';
import {User} from '../../core/models/user';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {canEditTheme, canReadOrganization, selectCurrentUser} from '../../store/auth/auth.selectors';
import {MatDialog} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {UploadFileComponent, UploadFileParams} from '../../upload-file/upload-file/upload-file.component';
import {LOAD_USER} from '../../store/auth/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user$: Observable<User | undefined> = this.store.pipe(select(selectCurrentUser));
  canReadOrg$: Observable<boolean> = this.store.pipe(select(canReadOrganization));
  canEditTheme$: Observable<boolean> = this.store.pipe(select(canEditTheme));

  constructor(private store: Store<AppState>,
              private dialog: MatDialog) {
  }

  openImageDialog() {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (!user?.id) {
        return;
      }
      const params: UploadFileParams = {
        entityId: user.id,
        entityType: 'User'
      };
      const dialog = this.dialog.open(UploadFileComponent, {
        disableClose: true,
        minWidth: '33%',
        data: params
      });
      dialog.afterClosed().pipe(take(1)).subscribe((res) => {
        if (res?.success) {
          this.store.dispatch(LOAD_USER());
        }
      });
    });
  }
}
