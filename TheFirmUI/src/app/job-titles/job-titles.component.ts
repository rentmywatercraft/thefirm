import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JobTitleModel } from 'src/models/jobTitleModel';
import { TheFirmService } from '../services/the-firm.service';

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.scss']
})
export class JobTitlesComponent implements OnInit {
  jobTitles: string[];

  selectedItemId: JobTitleModel=null;

  @Output() itemSelected = new EventEmitter<string>();

  constructor(public firmService: TheFirmService) { }

  ngOnInit() {
    this.firmService.getJobTitles().subscribe((result)=>{
      this.jobTitles = result;
    })
  }

  itemSelectedEvent() {
    //this.itemSelected.emit(this.selectedItem.id.toString());
  }
}
