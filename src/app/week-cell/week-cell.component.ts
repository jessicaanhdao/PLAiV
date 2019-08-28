import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-week-cell',
  templateUrl: './week-cell.component.html',
  styleUrls: ['./week-cell.component.css']
})
export class WeekCellComponent implements OnInit {
  @Input() tasks : []
  constructor() { }

  ngOnInit() {
  }

}
