import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customerEmailFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.ItemNO.toLocaleLowerCase().includes(args)) || (val.ItemName.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}