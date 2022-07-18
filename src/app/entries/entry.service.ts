import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  entryChangedEvent = new Subject<Entry[]>();
  private entries:Entry[]=[];
  constructor(private http:HttpClient) { }
  sortAndSend(){
    this.entries.sort((a,b)=>a.category>b.category?1:b.category>a.category?-1:0)
    this.entryChangedEvent.next(this.entries.slice());
  }
  getEntry(id:string){
    return this.http.get<{response: string, entry:Entry}>('http://localhost:3000/entries/' + id);
  }
  getEntries(){
    this.http.get<{response:string,entries:Entry[]}>('http://localhost:3000/entries/').subscribe(
      (responseData)=>{
        this.entries=responseData.entries;
        this.sortAndSend();
      }, (error:any)=>{
        console.log(error);
      }
    );
  }
  addEntry(entry:Entry){
    if(!entry){return;}
    entry.id='';
    const headers=new HttpHeaders({'Content-Type':'application/json'});
    this.http.post<{response:string,entry:Entry}>(
      'http://localhost:3000/entries',entry,{headers:headers})
      .subscribe((resData)=>{
        this.entries.push(resData.entry);
        this.sortAndSend();
      }
    );
  }
  updateEntry(originEntry:Entry,newEntry:Entry){
    if(!originEntry||!newEntry){return;}
    const pos=this.entries.findIndex(e=>e.id===originEntry.id);
    if(pos<0){return;}
    newEntry.id=originEntry.id;
    const headers=new HttpHeaders(
      {'Content-Type':'application/json'})
    this.http.put('http://localhost:3000/entries/'+ originEntry.id,newEntry,{headers:headers})
    .subscribe(
    ()=>{
    this.entries[pos]=newEntry;
    this.sortAndSend();
    })
  }
  deleteEntry(entry:Entry){
    if(!entry){return;}
    const pos=this.entries.findIndex(e=>e.id===entry.id);
    if(pos<0){return;}
    this.http.delete('http://localhost:3000/entries/' + entry.id)
    //((response:Response)=>{})
    .subscribe((response:Response)=>{
    this.entries.splice(pos,1);
    this.sortAndSend();
  }
  );
  }
}
