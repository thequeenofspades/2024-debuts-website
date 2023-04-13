import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(authors: any[] | null, authorName?: string): any[] | null {
    if (authors && authorName) {
      return authors.filter((author) =>
        (author.name as string).toLowerCase().includes(authorName.toLowerCase())
      );
    }
    return authors;
  }
}
