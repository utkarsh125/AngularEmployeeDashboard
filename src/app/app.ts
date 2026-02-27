import { Component } from '@angular/core';
import { EmployeeFormComponent } from './components/employee-form/employee-form';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeFormComponent, EmployeeListComponent, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span class="text-lg font-semibold">Employee Dashboard</span>
    </mat-toolbar>

    <div class="min-h-screen bg-slate-100 py-10">
      <div class="max-w-5xl mx-auto px-6 space-y-8">
        <app-employee-form></app-employee-form>
        <app-employee-list></app-employee-list>
      </div>
    </div>
  `,
})
export class App {}
