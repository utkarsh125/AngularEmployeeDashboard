import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './components/employee-form/employee-form';
import { EmployeeListComponent } from './components/employee-list/employee-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeFormComponent,
    EmployeeListComponent
  ],
  template: `
    <div class="app-container">
      <header class="main-header">
        <div class="header-content">
          <h1>Employee Management</h1>
          <p>Manage and oversee your organization's workforce effectively.</p>
        </div>
      </header>

      <main class="content">
        <div class="dashboard-grid">
          <section class="form-section">
            <app-employee-form></app-employee-form>
          </section>

          <section class="list-section">
            <app-employee-list></app-employee-list>
          </section>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f8f9fa;
      font-family: 'Inter', sans-serif;
    }
    .main-header {
      background: #fff;
      padding: 32px 0;
      border-bottom: 1px solid #eee;
      margin-bottom: 32px;
    }
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0 0 8px 0;
    }
    p {
      color: #666;
      margin: 0;
      font-size: 16px;
    }
    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 48px;
    }
    .dashboard-grid {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .main-header {
        padding: 20px 0;
        margin-bottom: 20px;
      }
      .header-content {
        padding: 0 16px;
      }
      h1 {
        font-size: 22px;
      }
      p {
        font-size: 14px;
      }
      .content {
        padding: 0 16px 32px;
      }
      .dashboard-grid {
        gap: 20px;
      }
    }

    @media (min-width: 601px) and (max-width: 960px) {
      .header-content,
      .content {
        padding-left: 20px;
        padding-right: 20px;
      }
      h1 {
        font-size: 26px;
      }
    }
  `]
})
export class AppComponent {
  title = 'employee-dashboard';
}
