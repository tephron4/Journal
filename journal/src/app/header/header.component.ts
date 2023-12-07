import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  username: string,
  password: string,
  loggedIn: boolean,
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleDayView = new EventEmitter<boolean>();
  @Output() signUp = new EventEmitter<any>();
  @Output() logOut = new EventEmitter<void>();
  @Input() username = '';
  @Input() loggedIn: boolean = false;

  password = '';

  constructor(public dialog: MatDialog) {}

  home() {
    this.toggleDayView.emit(false);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AccountDialog, {
      width: '300px',
      data: {username: this.username, password: this.password, loggedIn: this.loggedIn}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result[0] !== 'logout') {
        this.username = result[0];
        this.password = result[1];
        this.signUp.emit({username: this.username, password: this.password});
      } else {
        this.password = '';
        this.logOut.emit();
      }
    });
  }
}

@Component({
  selector: 'account-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule,
    MatIconModule, 
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './account-dialog.html',
  styleUrl: './header.component.css'
})
export class AccountDialog {
  
  retypePassword = '';

  usernameForm = new FormControl('', [Validators.required]);
  passwordForm = new FormControl('', [Validators.required]);
  retypePasswordForm = new FormControl('', [Validators.required]);

  hidePass = true;
  hideRetypePass = true;

  constructor(
    public dialogRef: MatDialogRef<AccountDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  getRetypeError() {
    if (this.retypePasswordForm.hasError('required')) {
      return 'Please retype password';
    } else if (this.data.password !== this.retypePassword) {
      return 'Passwords do not match';
    }
    return '';
  }

  onPasswordChange() {
    if (this.retypePassword !== '' && this.data.password !== this.retypePassword) {
      this.retypePasswordForm.setErrors({passwordMismatch: true});
    } else if (this.retypePasswordForm.hasError('required')) {
      this.retypePasswordForm.setErrors({required: true});
    } else {
      this.retypePasswordForm.setErrors(null);
    }
  }
}