export interface BookRef {
  id: string;
  short: string;
  title: string;
  authors: string;
  year: number;
  edition?: string;
  spine: string;
}

export interface TopicDetail {
  id: string;
  title: string;
  definition: string;
  classicNote?: string;
  mnemonic?: string;
  complexity?: string;
  keyOperations?: string[];
  useCases?: string[];
  prosCons?: { pros: string[]; cons: string[] };
  sources: BookRef["id"][];
  chapter?: string;
  visualizeHref?: string;
}

export interface CourseSection {
  id: string;
  title: string;
  definition: string;
  concepts: string[];
  color: string;
}
