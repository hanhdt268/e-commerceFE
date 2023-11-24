import {AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {filter, fromEvent, Subscription} from "rxjs";

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective  implements AfterViewInit, OnDestroy{
  @Output() clickOutside = new EventEmitter<void>()

  documentClickOutside: Subscription | undefined
  constructor(private _element: ElementRef, @Inject(DOCUMENT) private _document: Document) { }

  ngAfterViewInit(): void {
    this.documentClickOutside = fromEvent(this._document, 'click').pipe(
      filter((event: any) => {
        return !this.isInside(event.target as HTMLElement)
      })
    ).subscribe(() => {
      this.clickOutside.emit();
    })
  }
  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck
      === this._element.nativeElement || this._element.nativeElement.contains(elementToCheck))
  }

  ngOnDestroy(): void {
    this.documentClickOutside?.unsubscribe();
  }

}
