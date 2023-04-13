import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(
    authors: { name: string; title: string }[] | null,
    searchConfig?: { authorName: string; bookTitle: string }
  ): any[] | null {
    if (authors && searchConfig) {
      if (searchConfig.authorName) {
        return authors.filter((author) =>
          author.name
            .toLowerCase()
            .includes(searchConfig.authorName.toLowerCase())
        );
      } else if (searchConfig.bookTitle) {
        return authors.filter((author) =>
          author.title
            .toLowerCase()
            .includes(searchConfig.bookTitle.toLowerCase())
        );
      }
    }
    return authors;
  }
}
