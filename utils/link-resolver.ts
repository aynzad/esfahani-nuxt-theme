interface IDoc {
  id: string;
  uid: string;
  type: string;
  tags: string[];
  lang: string;
  isBroken: boolean;
}
export default function (doc: IDoc) {
  if (doc.isBroken) {
    return '/not-found';
  }

  if (doc.type === 'homepage') {
    return '/';
  }

  if (doc.type === 'articles') {
    return '/articles/' + doc.uid;
  }

  if (doc.type === 'about') {
    return '/about/';
  }

  if (doc.type === 'contact') {
    return '/contact/';
  }

  return '/not-found';
}
