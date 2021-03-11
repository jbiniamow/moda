import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clothingType'
})
export class ClothingTypePipe implements PipeTransform {

  transform(items: any[], param: string): any {
    if (items) {
      return items.filter((item, index) => item.category === param);
    }
  }

}
