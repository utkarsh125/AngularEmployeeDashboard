import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    // REST Endpoints (for future Java backend integration)
    private readonly API_URL = 'http://localhost:8080/api/employees';

    private employees: Employee[] = [
        {
            id: 1,
            firstName: 'Utkarsh',
            lastName: 'Pandey',
            email: 'utkarsh@mail.com',
            department: 'Developer',
            dateOfJoining: new Date('2025-11-15')
        },

    ];

    private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

    constructor() { }

    getEmployees(): Observable<Employee[]> {
        return this.employeesSubject.asObservable();
    }

    addEmployee(employee: Omit<Employee, 'id'>): void {
        const newEmployee = {
            ...employee,
            id: this.employees.length > 0 ? Math.max(...this.employees.map(e => e.id)) + 1 : 1
        };
        this.employees = [...this.employees, newEmployee];
        this.employeesSubject.next(this.employees);
    }

    deleteEmployee(id: number): void {
        this.employees = this.employees.filter(e => e.id !== id);
        this.employeesSubject.next(this.employees);
    }
}
