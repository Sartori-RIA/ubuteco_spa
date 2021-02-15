import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private snackBar: MatSnackBar,
              private translate: TranslateService) {
  }


  info(msg: string, action: string = 'commons.buttons.ok') {
    this.translate.get(action).pipe(take(1)).subscribe((data) => {
      this.snackBar.open(msg, data, {
        duration: 2000,
        panelClass: 'snack-info'
      });
    });
  }

  success(msg: string, action: string = 'commons.buttons.ok') {
    this.translate.get(action).pipe(take(1)).subscribe((data) => {
      this.snackBar.open(msg, data, {
        duration: 2000,
        panelClass: 'snack-success'
      });
    });
  }

  warning(msg: string, action: string = 'commons.buttons.ok') {
    this.translate.get(action).pipe(take(1)).subscribe((data) => {
      this.snackBar.open(msg, data, {
        duration: 2000,
        panelClass: 'snack-warn'
      });
    });
  }

  error(msg: string, action: string = 'commons.buttons.ok') {
    this.translate.get(action).pipe(take(1)).subscribe((data) => {
      this.snackBar.open(msg, data, {
        duration: 2000,
        panelClass: 'snack-error'
      });
    });
  }

  destroyItemSuccess(registerType: RegisterType,
                     male: boolean = true,
                     action: string = 'Ok') {

    const maleOrFemale = male ? 'success_m' : 'success_f';
    this.translate.get(`commons.messages.destroy.${maleOrFemale}`, {register: registerType}).subscribe((msg) => {
      this.success(msg, action);
    });
  }

  updateSuccess(registerType: RegisterType,
                male: boolean = true,
                action: string = 'Ok') {
    const maleOrFemale = male ? 'success_m' : 'success_f';
    this.translate.get(`commons.messages.update.${maleOrFemale}`, {register: registerType}).subscribe((msg) => {
      this.success(msg, action);
    });
  }

  createSuccess(registerType: RegisterType,
                male: boolean = true,
                action: string = 'Ok') {
    const maleOrFemale = male ? 'success_m' : 'success_f';
    this.translate.get(`commons.messages.create.${maleOrFemale}`, {register: registerType}).subscribe((msg) => {
      this.success(msg, action);
    });
  }

  errorAction(actionType: 'destroy' | 'create' | 'update' | 'fetch',
              plural: boolean = false,
              action: string = 'Ok') {
    const singleOrPlural = plural ? 'error_n' : 'error';
    this.translate.get(`commons.messages.${actionType}.${singleOrPlural}`).subscribe((msg) => {
      this.error(msg, action);
    });
  }
}

export type RegisterType =
  'Bebida'
  | 'Cerveja'
  | 'Vinho'
  | 'Alimento'
  | 'Item do Cardápio'
  | 'Mesa'
  | 'Estilo de Cerveja'
  | 'Estilo de Vinho'
  | 'Fabricante/Cervejaria'
  | 'Item no pedido';
