import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../types';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(
    authors: Author[] | null,
    searchConfig?: { authorName?: string; bookTitle?: string }
  ): any[] | null {
    let filteredAuthors = authors;
    if (filteredAuthors && searchConfig) {
      if (searchConfig.authorName) {
        filteredAuthors = filteredAuthors.filter((author) =>
          author.name
            .toLowerCase()
            .includes(searchConfig.authorName!.toLowerCase())
        );
      }
      if (searchConfig.bookTitle) {
        filteredAuthors = filteredAuthors.filter((author) =>
          author.title
            .toLowerCase()
            .includes(searchConfig.bookTitle!.toLowerCase())
        );
      }
    }
    return filteredAuthors;
  }
}
