import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  // private selectedColors: any[] = [];
  public selectedColors: Subject<any> = new Subject<any>();
  public selectedClothing: Subject<any> = new Subject<any>();
  input: string = ''
  constructor() {}

  emitSelectChanges(input: any) {
    this.selectedColors.next(input);
  }

  emitSelectChangesClothing(input: any) {
    this.selectedClothing.next(input);
  }
}

