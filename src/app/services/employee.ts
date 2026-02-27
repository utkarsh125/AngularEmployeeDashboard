import { Employee } from '../models/employee';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private employees: Employee[] = [];
  private idCounter = 1;

  addEmployee(employee: Employee){
    employee.id = this.idCounter++;
    this.employees.push(employee);
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  deleteEmployee(id: number){
    this.employees = this.employees.filter(e => e.id !== id);
  }
}


//this will satisfy 3 things
//1. addEmployee()
//2. getEmployees()
//3. deleteEmployee()
