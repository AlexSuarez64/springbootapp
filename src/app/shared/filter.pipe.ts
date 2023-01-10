import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], columnName: string, filterString: string): any[] {
    filterString = filterString ? filterString.toLocaleLowerCase() : filterString;
    const work = value && value.length ? value[0][columnName] : null;
    if (typeof work === "boolean") {
      if (filterString) {
        const flag = filterString.indexOf('t') ? false : true;
        if (flag) {
          return filterString ? (value || []).filter((v: any) => v[columnName]) : value;
        } else {
          return filterString ? (value || []).filter((v: any) => !v[columnName]) : value;
        }
      } else {
        return value;
      }
    } else {
      return filterString ? (value || []).filter((v: any) => v[columnName] ? v[columnName].toLocaleLowerCase().indexOf(filterString) !== -1 : false) : value;
    }
  }
}
