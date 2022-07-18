import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '../entry.model';
import { EntryService } from '../entry.service';

@Component({
  selector: 'resume-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrls: ['./entry-item.component.css']
})
export class EntryItemComponent implements OnInit {
  @Input() entry:Entry;
  @Input() index:number;

  constructor(private entryService:EntryService) { }

  ngOnInit(): void {
  }

}
