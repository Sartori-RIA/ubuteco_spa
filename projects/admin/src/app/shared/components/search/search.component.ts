import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() search = new EventEmitter<string>();

  applyFilter(word: string) {
    this.search.emit(word.trim().toLowerCase());
  }

  getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement)?.value || '';
  }

}
