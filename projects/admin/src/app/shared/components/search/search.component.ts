import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() onSearch = new EventEmitter<string>();

  applyFilter(word: string) {
    this.onSearch.emit(word.trim().toLowerCase());
  }

  getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement)?.value || '';
  }

}
