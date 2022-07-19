import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Entry } from '../entry.model';
import { EntryService } from '../entry.service';

@Component({
  selector: 'resume-entry-edit',
  templateUrl: './entry-edit.component.html',
  styleUrls: ['./entry-edit.component.css']
})
export class EntryEditComponent implements OnInit {
  editMode=false;
  originalEntry: Entry;
  entry:Entry;
  id: string;
  // actions:string[]=[];
  constructor(
    private route:ActivatedRoute,
    private entryService:EntryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      if(!this.id){
        this.editMode=false;
        return;
      }
      this.entryService.getEntry(this.id).subscribe((entryData)=>{
        this.originalEntry=entryData.entry;
        if(!this.originalEntry){return;}
        this.editMode=true;
        this.entry=JSON.parse(JSON.stringify(this.originalEntry));
        // if(this.originalEntry.actions&&this.originalEntry.actions.length>0){
        //   this.actions=JSON.parse(JSON.stringify(this.originalEntry.actions));
        // }
      })
      
    })
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newEntry = new Entry(
      value.id,
      value.title,
      value.company,
      value.date,
      value.location,
      value.category,
      value.imageUrl,
      value.link,
      value.actions
    );
    if(this.editMode){
      this.entryService.updateEntry(this.originalEntry,newEntry);
    }else{
      this.entryService.addEntry(newEntry);
    }
    this.router.navigate(['/entries']);
  }
  onCancel(){
    this.router.navigate(['/entries']);
  }
}
