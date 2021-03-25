import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
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
  selectedJobTitle: any;

  constructor(public firmService: TheFirmService, private router: Router) { }

  ngOnInit() {
    this.firmService.getJobTitles().subscribe((result)=>{
      this.jobTitles = result;
    })
    this.model.isActive = true;
  }

  updateJobTitleId(jobTitle:any){
    this.model.jobTitleId = jobTitle.id;
  }

  saveEmployee() {
    this.firmService.createEmployee(this.model);
    this.router.navigate(['/','home']);
  }
}
