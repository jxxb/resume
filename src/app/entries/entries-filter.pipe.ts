import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from './entry.model';
@Pipe({
  name: 'entriesFilter'
})
export class EntriesFilterPipe implements PipeTransform {
  transform(entries:Entry[],term: string): any {
    let filteredEntries: Entry[] = [];
      if(term && term.length > 0) {
        filteredEntries = entries.filter(
          (entry:Entry) => 
          entry.title.toLowerCase().includes(term.toLowerCase())
          );
        }
      return filteredEntries.length > 0 ? filteredEntries : entries;
  }

}
