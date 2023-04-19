import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../types';

@Pipe({
  name: 'sortAuthors',
})
export class SortAuthorsPipe implements PipeTransform {
  transform(authors: Author[] | null, byCovers: boolean): Author[] | null {
    if (!authors) return authors;

    if (byCovers) {
      return authors.sort((authorA, authorB) =>
        (authorA.bookCoverUrl ?? '') > (authorB.bookCoverUrl ?? '') ? -1 : 1
      );
    } else {
      return authors.sort((authorA, authorB) =>
        (authorA.authorPhotoUrl ?? '') > (authorB.authorPhotoUrl ?? '') ? -1 : 1
      );
    }
  }
}
