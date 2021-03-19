import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoaderComponent} from './loader.component';

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {
  dialogRef?: MatDialogRef<LoaderComponent>;

  constructor(private dialog: MatDialog) {
  }

  open(title: string = 'Aguarde...') {
    this.dialogRef = this.dialog.open(LoaderComponent, {disableClose: true});
    this.dialogRef.updateSize('200px');
    this.dialogRef.componentInstance.title = title;
    return this.dialogRef.afterClosed();
  }

  close() {
    this.dialogRef?.close();
  }
}
