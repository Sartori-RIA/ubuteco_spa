import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import * as hl from 'highlight.js';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[libHighlight]',
})
export class HighlightDirective implements OnInit, OnChanges, OnDestroy {

  @Input() path: string;
  @Input() code: string;
  @Input() languages: string[];
  @HostBinding('class.hljs') hljs: string;
  @HostBinding('[innerHTML]') highlightedCode: string;
  private unsubscribeAll: Subject<any>;

  constructor(private el: ElementRef,
              private cdr: ChangeDetectorRef,
              private zone: NgZone,
              private http: HttpClient) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    if (this.code) {
      this.highlightElement(this.code);
    }
    if (this.path) {
      this.highlightedCode = 'Loading...';
      this.http
        .get(this.path, {responseType: 'text'})
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(response => {
          this.highlightElement(response, this.languages);
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.code &&
      changes.code.currentValue &&
      changes.code.currentValue !== changes.code.previousValue
    ) {
      this.highlightElement(this.code);
      // console.log('hljs on change', changes)
    }
  }

  highlightElement(code: string, languages?: string[]) {
    this.zone.runOutsideAngular(() => {
      const res = hl.highlightAuto(code);
      this.highlightedCode = res.value;
      // this.cdr.detectChanges();
      // console.log(languages)
    });
  }
}
