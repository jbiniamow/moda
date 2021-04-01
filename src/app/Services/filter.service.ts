import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  // private selectedColors: any[] = [];
  public selectedColors: Subject<any> = new Subject<any>();
  constructor() {}

  emitSelectChanges(input: any) {
    this.selectedColors.next(input);
  }
}

