import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Entry } from '../entry.model';
import { EntryService } from '../entry.service';

@Component({
  selector: 'resume-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];
  subscription: Subscription;
  term: string;

  constructor(private EntryService: EntryService) { }

  ngOnInit(): void {
    this.subscription = this.EntryService.entryChangedEvent
    .subscribe(
      (entries:Entry[]) => {
        this.entries = entries;
      }
    );

    this.EntryService.getEntries();
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  search(value:string){
    this.term = value;
  }
}
