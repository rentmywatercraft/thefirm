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

  constructor(public firmService: TheFirmService) { }

  ngOnInit() {

    //this.getStubbedData();

    this.firmService.getJobTitles().subscribe((result)=>{
      this.jobTitles = result;
    });

    this.firmService.getEmployees().subscribe((result)=>{
      this.employeesList = result;
    });
  }

  saveEmployees() {
    //TODO: Not tested
    //this.firmService.updateEmployees(this.employeesList);
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
