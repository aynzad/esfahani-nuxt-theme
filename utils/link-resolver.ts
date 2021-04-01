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

  if (doc.type === 'article') {
    return '/articles/' + doc.uid;
  }

  return '/not-found';
}
