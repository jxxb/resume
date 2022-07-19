import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Info } from './info.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  infoChangedEvent = new Subject<Info[]>();
  private infos:Info[]=[];
  constructor(private http:HttpClient) { }
  sortAndSend(){
    this.infos.sort((a,b)=>a.name>b.name?1:b.name>a.name?-1:0)
    this.infoChangedEvent.next(this.infos.slice());
  }
  getInfo(id:string){
    return this.http.get<{response: string, info:Info}>('http://localhost:3000/infos/' + id);
  }
  getInfos(){
    this.http.get<{response:string,infos:Info[]}>('http://localhost:3000/infos/').subscribe(
      (responseData)=>{
        this.infos=responseData.infos;
        this.sortAndSend();
      }, (error:any)=>{
        console.log(error);
      }
    );
  }
  addInfo(info:Info){
    if(!info){return;}
    info.id='';
    const headers=new HttpHeaders({'Content-Type':'application/json'});
    this.http.post<{response:string,info:Info}>(
      'http://localhost:3000/infos',info,{headers:headers})
      .subscribe((resData)=>{
        this.infos.push(resData.info);
        this.sortAndSend();
      }
    );
  }
  updateEntry(originInfo:Info,newInfo:Info){
    if(!originInfo||!newInfo){return;}
    const pos=this.infos.findIndex(e=>e.id===originInfo.id);
    if(pos<0){return;}
    newInfo.id=originInfo.id;
    const headers=new HttpHeaders(
      {'Content-Type':'application/json'})
    this.http.put('http://localhost:3000/infos/'+ originInfo.id,newInfo,{headers:headers})
    .subscribe(
    ()=>{
    this.infos[pos]=newInfo;
    this.sortAndSend();
    })
  }
  deleteEntry(info:Info){
    if(!info){return;}
    const pos=this.infos.findIndex(e=>e.id===info.id);
    if(pos<0){return;}
    this.http.delete('http://localhost:3000/infos/' + info.id)
    //((response:Response)=>{})
    .subscribe((response:Response)=>{
    this.infos.splice(pos,1);
    this.sortAndSend();
  }
  );
  }
}