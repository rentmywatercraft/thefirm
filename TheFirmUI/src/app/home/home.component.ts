import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/models/employeeModel';
import { TheFirmService } from '../services/the-firm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  activeEmployees:EmployeeModel[];
  inactiveEmployees: EmployeeModel[];

  constructor(public firmService: TheFirmService) { }

  ngOnInit() {
    this.firmService.getActiveEmployees().subscribe((result)=>{
      this.activeEmployees = result;
    });

    this.firmService.getInactiveEmployees().subscribe((result)=>{
      this.inactiveEmployees = result;
    });
  }

}
