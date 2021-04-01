/* eslint-disable camelcase */

export interface IArticles {
  uid: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  readTime?: number;
}

export type SliceName = 'text' | 'quote' | 'code' | 'lang';
export enum ElementType {
  heading1 = 'heading1',
  heading2 = 'heading2',
  heading3 = 'heading3',
  heading4 = 'heading4',
  heading5 = 'heading5',
  heading6 = 'heading6',
  paragraph = 'paragraph',
  preformatted = 'preformatted',
  strong = 'strong',
  em = 'em',
  listItem = 'list-item',
  oListItem = 'o-list-item',
  list = 'group-list-item',
  oList = 'group-o-list-item',
  image = 'image',
  embed = 'embed',
  hyperlink = 'hyperlink',
  label = 'label',
  span = 'span',
}

interface IBaseElement {
  readonly type: ElementType;
}

export interface IElementParagraph extends IBaseElement {
  readonly type:
    | ElementType.paragraph
    | ElementType.heading1
    | ElementType.heading2
    | ElementType.heading3
    | ElementType.heading4
    | ElementType.heading5
    | ElementType.heading6
    | ElementType.heading6
    | ElementType.preformatted;
  spans: string[];
  text: string;
}

export interface IElementImage {
  readonly type: ElementType.image;
  alt: string;
  copyright: string | null;
  dimensions: { width: number; height: number };
  url: string;
  label: string | null;
  linkTo: any;
  data: any;
}
export interface IElementHyperlink {
  readonly type: ElementType.hyperlink;
  data: any;
}

export type Element = IElementParagraph | IElementImage | IElementHyperlink;

export type SliceItem = {
  [key in SliceName]: Element[];
};
export interface ISlice {
  items: SliceItem[];
  primary: SliceItem;
  slice_label: string | null;
  slice_type: SliceName;
}
