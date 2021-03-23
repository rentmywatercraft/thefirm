import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { EmployeeModel } from 'src/models/employeeModel';
import { JobTitleModel } from 'src/models/jobTitleModel';
import { TheFirmService } from '../services/the-firm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobTitles: JobTitleModel[];
  employeesList: EmployeeModel[];
  nameFilter: string="";
  selectedJobTitle: JobTitleModel=null;
  selectedActiveEmployees: EmployeeModel[];
  selectedInactiveEmployees: EmployeeModel[];

  constructor(public firmService: TheFirmService) { }

  ngOnInit() {

    this.getStubbedData();

    // this.firmService.getJobTitles().subscribe((result)=>{
    //   this.jobTitles = result;
    // });

    // this.firmService.getEmployees().subscribe((result)=>{
    //   this.employeesList = result;
    // });
  }

  getInactiveEmployeesForHeading(title: JobTitleModel) {
    return this.employeesList.filter((emp) => {
      return emp.jobTitleId === title.id && !emp.isActive 
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

  activateSelectedEmployees() {
    this.selectedInactiveEmployees.forEach(element => {
      this.employeesList.find((emp) => {
        return emp.firstName == element.firstName && emp.lastName == emp.lastName;
      }).isActive = true;
    });
  }

  activateAllEmployees() {
    this.employeesList.forEach((emp) => {
      emp.isActive = true;
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

  saveEmployees() {
    this.firmService.updateEmployees(this.employeesList);
  }

  getStubbedData() {
    // Stub job titles
    this.jobTitles = new Array();

    this.jobTitles[0] = new JobTitleModel();
    this.jobTitles[0].title = "Graphic Designer";
    this.jobTitles[0].id = Guid.create();

    this.jobTitles[1] = new JobTitleModel();
    this.jobTitles[1].title = "Receptionist";
    this.jobTitles[1].id = Guid.create();

    // Stub employees
    this.employeesList = new Array();
    let i = 0;
    this.employeesList[i] = new EmployeeModel();
    this.employeesList[i].firstName = "Jerry"
    this.employeesList[i].lastName = "Smith"
    this.employeesList[i].isActive = false;
    this.employeesList[i].jobTitleId = this.jobTitles[0].id;

    i++;
    this.employeesList[i] = new EmployeeModel();
    this.employeesList[i].firstName = "John"
    this.employeesList[i].lastName = "Brinks"
    this.employeesList[i].isActive = false;
    this.employeesList[i].jobTitleId = this.jobTitles[0].id;

    i++;
    this.employeesList[i] = new EmployeeModel();
    this.employeesList[i].firstName = "Tim"
    this.employeesList[i].lastName = "Thompson"
    this.employeesList[i].isActive = false;
    this.employeesList[i].jobTitleId = this.jobTitles[1].id;

    i++;
    this.employeesList[i] = new EmployeeModel();
    this.employeesList[i].firstName = "Jenny"
    this.employeesList[i].lastName = "Stone"
    this.employeesList[i].isActive = true;
    this.employeesList[i].jobTitleId = this.jobTitles[1].id;

    i++;
    this.employeesList[i] = new EmployeeModel();
    this.employeesList[i].firstName = "Jill"
    this.employeesList[i].lastName = "Banks"
    this.employeesList[i].isActive = true;
    this.employeesList[i].jobTitleId = this.jobTitles[1].id;
  }
}
