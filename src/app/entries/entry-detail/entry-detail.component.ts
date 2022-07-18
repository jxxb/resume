import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry.model';

@Component({
  selector: 'resume-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {
  entry:Entry;
  id: string;
  constructor() { }

  ngOnInit(): void {
  }

}
