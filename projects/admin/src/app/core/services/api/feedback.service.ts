import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private snackBar: MatSnackBar) {

  }


  info(msg: string, action: string = 'Ok') {
    this.snackBar.open(msg, action, {
      duration: 2000,
      panelClass: 'snack-info'
    });
  }

  success(msg: string, action: string = 'Ok') {
    this.snackBar.open(msg, action, {
      duration: 2000,
      panelClass: 'snack-success'
    });
  }

  warning(msg: string, action: string = 'Ok') {
    this.snackBar.open(msg, action, {
      duration: 2000,
      panelClass: 'snack-warn'
    });
  }

  error(msg: string, action: string = 'Ok') {
    this.snackBar.open(msg, action, {
      duration: 2000,
      panelClass: 'snack-error'
    });
  }

  destroyItemSuccess(registerType: RegisterType,
                     male: boolean = true,
                     action: string = 'Ok') {

    const maleOrFemale = male ? 'removido' : 'removida';
    const msg = `${registerType} ${maleOrFemale} com sucesso`;
    this.success(msg, action);
  }

  updateSuccess(registerType: RegisterType,
                male: boolean = true,
                action: string = 'Ok') {
    const maleOrFemale = male ? 'atualizado' : 'atualizada';
    const msg = `${registerType} ${maleOrFemale} com sucesso`;
    this.success(msg, action);
  }

  createSuccess(registerType: RegisterType,
                male: boolean = true,
                action: string = 'Ok') {
    const maleOrFemale = male ? 'adicionado' : 'adicionada';
    const msg = `${registerType} ${maleOrFemale} com sucesso`;
    this.success(msg, action);
  }

  errorAction(actionType: 'remover' | 'criar' | 'atualizar' | 'recuperar',
              plural: boolean = false,
              action: string = 'Ok') {
    const singleOrPlural = plural ? 'os registros' : 'o registro';
    const msg = `Ops, sinto muito, aconteceu algo inesperado ao tentar ${actionType} ${singleOrPlural}, por favor tente novamente`;
    this.error(msg, action);
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
