import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-trash-button',
  templateUrl: './trash-button.component.html',
  styleUrls: ['./trash-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrashButtonComponent {

  @Output() deleteElement = new EventEmitter();
  @Input() tooltip = '';

  constructor(private dialog: MatDialog) {
  }

  confirmToDelete() {
    const ref = this.dialog.open(ConfirmDialogComponent);
    ref.afterClosed().subscribe((res) => {
      if (res?.confirm) {
        this.deleteElement.emit();
      }
    });
  }

}
