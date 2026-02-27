import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.interface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="list-container mat-elevation-z2">
      <div class="list-header">
        <h2>Employee Directory</h2>
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search anything</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Search by name, email or department">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <div class="table-responsive">
        <table mat-table [dataSource]="(filteredEmployees$ | async) || []" class="full-width">
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> ID </th>
            <td mat-td *matCellDef="let employee"> {{employee.id}} </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Name </th>
            <td mat-td *matCellDef="let employee">
              <div class="name-cell">
                <span class="user-avatar">{{employee.firstName[0]}}{{employee.lastName[0]}}</span>
                {{employee.firstName}} {{employee.lastName}}
              </div>
            </td>
          </ng-container>

          <!-- Email Column -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef> Email </th>
            <td mat-td *matCellDef="let employee"> {{employee.email}} </td>
          </ng-container>

          <!-- Department Column -->
          <ng-container matColumnDef="department">
            <th mat-header-cell *matHeaderCellDef> Department </th>
            <td mat-td *matCellDef="let employee">
              <span class="dept-badge">{{employee.department}}</span>
            </td>
          </ng-container>

          <!-- Joining Date Column -->
          <ng-container matColumnDef="dateOfJoining">
            <th mat-header-cell *matHeaderCellDef> Joining Date </th>
            <td mat-td *matCellDef="let employee"> {{employee.dateOfJoining | date:'mediumDate'}} </td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Action </th>
            <td mat-td *matCellDef="let employee">
              <button mat-icon-button color="warn" (click)="onDelete(employee.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

          <!-- Row shown when there is no matching data. -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell no-data-cell" colspan="6">No employees found matching the search.</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .list-container {
      padding: 24px;
      background: #fff;
      border-radius: 12px;
      width: 100%;
      box-sizing: border-box;
    }
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    h2 {
      margin: 0;
      color: #333;
      font-weight: 600;
    }
    .search-field {
      min-width: 260px;
      flex: 1;
      max-width: 400px;
    }
    .table-responsive {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .full-width {
      width: 100%;
      min-width: 640px;           /* prevents columns from collapsing */
    }
    .name-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      white-space: nowrap;
    }
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #e3f2fd;
      color: #1976d2;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      flex-shrink: 0;
    }
    .dept-badge {
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      background: #f5f5f5;
      color: #616161;
      white-space: nowrap;
    }
    th.mat-header-cell {
      color: #9e9e9e;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .mat-column-actions {
      width: 60px;
      text-align: center;
    }
    .no-data-cell {
      padding: 32px 16px;
      text-align: center;
      color: #999;
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .list-container {
        padding: 16px;
        border-radius: 8px;
      }
      .list-header {
        flex-direction: column;
        align-items: stretch;
      }
      .search-field {
        min-width: 100%;
        max-width: 100%;
      }
      h2 { font-size: 18px; }
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees$!: Observable<Employee[]>;
  filteredEmployees$!: Observable<Employee[]>;
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'dateOfJoining', 'actions'];
  filterValue: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
    this.filteredEmployees$ = this.employees$;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.filteredEmployees$ = this.employees$.pipe(
      map(employees => employees.filter(e =>
        e.firstName.toLowerCase().includes(filterValue) ||
        e.lastName.toLowerCase().includes(filterValue) ||
        e.email.toLowerCase().includes(filterValue) ||
        e.department.toLowerCase().includes(filterValue)
      ))
    );
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
    }
  }
}
