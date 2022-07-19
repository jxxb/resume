import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntriesComponent } from './entries/entries.component';
import { EntryDetailComponent } from './entries/entry-detail/entry-detail.component';
import { EntryEditComponent } from './entries/entry-edit/entry-edit.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [

  {path: '',redirectTo: '/entries', pathMatch:'full'},
  {path: 'entries',component:EntriesComponent,
  children: [
    {path: 'new',component:EntryEditComponent},
    {path: ':id',component:EntryDetailComponent},
    {path: ':id/edit',component:EntryEditComponent},
  ]},
  {path: 'infos',component:InfoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
