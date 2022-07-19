import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Entry } from '../entry.model';
import { EntryService } from '../entry.service';

@Component({
  selector: 'resume-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {
  entry:Entry;
  id: string;
  constructor(private EntryService:EntryService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        this.EntryService.getEntry(this.id).subscribe((entryData)=>{this.entry=entryData.entry;
        })
      }
    )
  }
  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onDelete(){
    this.EntryService.deleteEntry(this.entry);
    this.router.navigateByUrl('/entries');
  }
}
