import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { EmployeeModel } from 'src/models/employeeModel';
import { JobTitleModel } from 'src/models/jobTitleModel';
import { TheFirmService } from '../services/the-firm.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input() jobTitles: JobTitleModel[];
  @Input() employeesList: EmployeeModel[];
  // Filters
  nameFilter: string="";
  selectedJobTitle: JobTitleModel=null;
  activeFilter: string;

  selectedActiveEmployees: EmployeeModel[];
  selectedInactiveEmployees: EmployeeModel[];

  constructor(public firmService: TheFirmService) { }

  ngOnInit() {
  }

  getEmployeesForHeading(title: JobTitleModel) {
    return this.employeesList.filter((emp) => {
      return emp.jobTitleId === title.id
      && (this.activeFilter == null || this.activeFilter == 'true' && emp.isActive || this.activeFilter=='false' && !emp.isActive)
      && (this.selectedJobTitle == null || this.selectedJobTitle.id == emp.jobTitleId)
      && (this.nameFilter == "" || emp.lastName.toLowerCase().includes(this.nameFilter.toLowerCase())|| emp.firstName.toLowerCase().includes(this.nameFilter.toLowerCase()));
    }).sort((a, b) => (a.lastName < b.lastName ? -1 : 1));
  }

  getActiveEmployeesForHeading(title: JobTitleModel) {
    return this.employeesList.filter((emp) => {
      return emp.jobTitleId === title.id && emp.isActive
       && (this.selectedJobTitle == null || this.selectedJobTitle.id == emp.jobTitleId)
       && (this.nameFilter == "" || emp.lastName.toLowerCase().includes(this.nameFilter.toLowerCase()) || emp.firstName.toLowerCase().includes(this.nameFilter.toLowerCase()));
    }).sort((a, b) => (a.lastName < b.lastName ? -1 : 1));
  }

  getInactiveEmployeesForHeading(title: JobTitleModel) {
    return this.employeesList.filter((emp) => {
      return emp.jobTitleId === title.id && !emp.isActive
       && (this.selectedJobTitle == null || this.selectedJobTitle.id == emp.jobTitleId)
       && (this.nameFilter == "" || emp.lastName.toLowerCase().includes(this.nameFilter.toLowerCase()) || emp.firstName.toLowerCase().includes(this.nameFilter.toLowerCase()));
    }).sort((a, b) => (a.lastName < b.lastName ? -1 : 1));
  }

  activateSelectedEmployees() {
    this.selectedInactiveEmployees.forEach(element => {
      this.employeesList.find((emp) => {
        return emp.firstName == element.firstName && emp.lastName == emp.lastName;
      }).isActive = true;
    });
  }

  deactivateSelectedEmployees() {
    this.selectedActiveEmployees.forEach(element => {
      this.employeesList.find((emp) => {
        return emp.firstName == element.firstName && emp.lastName == emp.lastName;
      }).isActive = false;
    });
  }

  deactivateAllEmployees() {
    this.employeesList.forEach((emp) => {
      emp.isActive = false;
    });
  }

  activateAllEmployees() {
    this.employeesList.forEach((emp) => {
      emp.isActive = true;
    });
  }
}
