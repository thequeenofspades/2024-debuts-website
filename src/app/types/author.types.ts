export interface Author {
  // Author details
  name: string;
  authorPhotoUrl?: string;
  authorPhotoAltText?: string;
  bio?: string;
  pronouns?: string;
  rep?: string;
  links?: AuthorLink[];
  // Book details
  title: string;
  publisher: string;
  season?: Season;
  releaseDate?: Date;
  ageCategory?: AgeCategory | AgeCategory[];
  genre?: Genre | Genre[];
  bookCoverUrl?: string;
  bookCoverAltText?: string;
  goodreadsUrl?: string;
  preorderUrl?: string;
}

export interface AuthorLink {
  name: string;
  url: string;
}

export enum Season {
  WINTER = 'Winter',
  SPRING = 'Spring',
  SUMMER = 'Summer',
  FALL = 'Fall',
}

export enum AgeCategory {
  PB = 'PB',
  MG = 'MG',
  YA = 'YA',
  NA = 'NA',
  ADULT = 'Adult',
}

export enum Genre {
  ACTION_ADVENTURE = 'Action/Adventure',
  COMEDY = 'Comedy',
  CONTEMPORARY = 'Contemporary',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
  HISTORICAL = 'Historical',
  HORROR = 'Horror',
  LITERARY = 'Literary',
  MAGICAL_REALISM = 'Magical Realism',
  MEMOIR = 'Memoir',
  MILITARY = 'Military',
  MYSTERY = 'Mystery',
  NONFICTION = 'Nonfiction',
  PARANORMAL = 'Paranormal',
  RELIGIOUS = 'Religious',
  ROMANCE = 'Romance',
  SCIENCE_FICTION = 'Science Fiction',
  SPORTS = 'Sports',
  SUSPENSE = 'Suspense',
  THRILLER = 'Thriller',
  WOMENS_FICTION = "Women's Fiction",
}
