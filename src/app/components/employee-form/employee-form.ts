import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="form-container mat-elevation-z2">
      <h2>Add New Employee</h2>
      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>First Name</mat-label>
            <input matInput formControlName="firstName" placeholder="Utkarsh">
            <mat-error *ngIf="employeeForm.get('firstName')?.hasError('required')">
              First name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Last Name</mat-label>
            <input matInput formControlName="lastName" placeholder="Pandey">
            <mat-error *ngIf="employeeForm.get('lastName')?.hasError('required')">
              Last name is required
            </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" placeholder="utkarsh.pandey@example.com">
          <mat-error *ngIf="employeeForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="employeeForm.get('email')?.hasError('email')">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Department</mat-label>
            <mat-select formControlName="department">
              <mat-option *ngFor="let dept of departments" [value]="dept">
                {{dept}}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="employeeForm.get('department')?.hasError('required')">
              Department is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Date of Joining</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="dateOfJoining">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="employeeForm.get('dateOfJoining')?.hasError('required')">
              Joining date is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit" [disabled]="employeeForm.invalid">
            Add Employee
          </button>
          <button mat-button type="button" (click)="resetForm()">Reset</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 24px;
      margin-bottom: 32px;
      background: #fff;
      border-radius: 12px;
      width: 100%;
      box-sizing: border-box;
    }
    h2 {
      margin-bottom: 24px;
      color: #333;
      font-weight: 600;
    }
    .form-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .form-row mat-form-field {
      flex: 1;
      min-width: 0;
    }
    .full-width {
      width: 100%;
    }
    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 16px;
      flex-wrap: wrap;
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .form-container {
        padding: 16px;
        margin-bottom: 20px;
        border-radius: 8px;
      }
      h2 { font-size: 18px; margin-bottom: 16px; }
      .form-row {
        flex-direction: column;
        gap: 0;
      }
      .form-actions {
        justify-content: stretch;
      }
      .form-actions button {
        flex: 1;
      }
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  departments: string[] = ['Product Manager', 'UX Researcher', 'Developer', 'Designer', 'QA', 'Marketing'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      dateOfJoining: [new Date(), Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const { firstName, lastName } = this.employeeForm.value;
      this.employeeService.addEmployee(this.employeeForm.value);
      this.snackBar.open(
        `✅  ${firstName} ${lastName} added successfully!`,
        'Dismiss',
        { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' }
      );
      this.resetForm();
    }
  }

  resetForm(): void {
    this.employeeForm.reset({
      dateOfJoining: new Date()
    });
  }
}
