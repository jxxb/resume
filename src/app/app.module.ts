import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryDetailComponent } from './entries/entry-detail/entry-detail.component';
import { EntryEditComponent } from './entries/entry-edit/entry-edit.component';
import { EntryItemComponent } from './entries/entry-item/entry-item.component';
import { EntryListComponent } from './entries/entry-list/entry-list.component';
import { InfoComponent } from './info/info.component';
import { HeaderComponent } from './header.component';
import { DndModule } from 'ng2-dnd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntriesFilterPipe } from './entries/entries-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    EntryDetailComponent,
    EntryEditComponent,
    EntryItemComponent,
    EntryListComponent,
    InfoComponent,
    HeaderComponent,
    EntriesFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
