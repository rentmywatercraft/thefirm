import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { EmployeeModel } from 'src/models/employeeModel';
import { JobTitleModel } from 'src/models/jobTitleModel';
import { TheFirmService } from '../services/the-firm.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  submitted = false;
  model = new EmployeeModel();
  jobTitles: JobTitleModel[];

  constructor(public firmService: TheFirmService) { }

  ngOnInit() {
    this.firmService.getJobTitles().subscribe((result)=>{
      this.jobTitles = result;
    })
    this.model.isActive = true;
  }

  saveEmployee() {
    var i = 1;
    this.firmService.createEmployee(this.model);
  }
}
