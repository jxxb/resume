import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Info } from './info.model';
import { InfoService } from './info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  info:Info;
  id: string;
  constructor(private InfoService:InfoService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        this.InfoService.getInfo(this.id).subscribe((infoData)=>{
          this.info=infoData.info;
        })
      }
    )
  }
  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onDelete(){
    this.InfoService.deleteEntry(this.info);
    this.router.navigateByUrl('/entries');
  }

}
