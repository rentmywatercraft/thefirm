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
  nameFilter: string="";
  selectedJobTitle: JobTitleModel=null;
  activeFilter: string;

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
}
