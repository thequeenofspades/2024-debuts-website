import test_authors from '../authors.json';
import { Author } from '../types';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let authors: Author[];

  beforeEach(() => {
    pipe = new FilterPipe();
    authors = JSON.parse(JSON.stringify(test_authors));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filtering without search parameters returns all authors', () => {
    let filteredAuthors = pipe.transform(authors);

    expect(filteredAuthors?.length).toEqual(authors.length);
  });

  it('filters by author name', () => {
    let filteredAuthors = pipe.transform(authors, {
      authorName: 'n',
    });

    expect(filteredAuthors!.length).toEqual(2);
  });

  it('filters by book title', () => {
    let filteredAuthors = pipe.transform(authors, {
      bookTitle: 'r',
    });

    expect(filteredAuthors!.length).toEqual(3);
  });
});
