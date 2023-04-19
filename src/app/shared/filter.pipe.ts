import { Pipe, PipeTransform } from '@angular/core';
import { AgeCategory, Author } from '../types';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(authors: Author[] | null, searchConfig?: any): any[] | null {
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
      if (searchConfig.publisher) {
        filteredAuthors = filteredAuthors.filter((author) =>
          author.publisher
            .toLowerCase()
            .includes(searchConfig.publisher!.toLowerCase())
        );
      }
      if (searchConfig.ageCategory) {
        filteredAuthors = filteredAuthors.filter((author) => {
          if (Array.isArray(author.ageCategory)) {
            return author.ageCategory.includes(searchConfig.ageCategory);
          } else {
            return author.ageCategory === searchConfig.ageCategory;
          }
        });
      }
      if (searchConfig.genre) {
        filteredAuthors = filteredAuthors.filter((author) => {
          if (Array.isArray(author.genre)) {
            return author.genre.includes(searchConfig.genre);
          } else {
            return author.genre === searchConfig.genre;
          }
        });
      }
      if (searchConfig.season) {
        filteredAuthors = filteredAuthors.filter((author) => {
          return author.season === searchConfig.season;
        });
      }
      if (searchConfig.hasPreorderLink) {
        filteredAuthors = filteredAuthors.filter(
          (author) => !!author.preorderUrl
        );
      }
    }
    return filteredAuthors;
  }
}
