import { Component, OnInit } from '@angular/core';
import { TheFirmService } from '../services/the-firm.service';

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.scss']
})
export class JobTitlesComponent implements OnInit {
  jobTitles: string[];

  constructor(public firmService: TheFirmService) { }

  ngOnInit() {
    this.firmService.getJobTitles().subscribe((result)=>{
      this.jobTitles = result;
    })
  }
}
