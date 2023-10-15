export class Collection {
  name: string;
  code: string;
  fileDrawing: string;
  description: string;
  cid: string;
  urlImage: string;
  urlAnimation!: string | null;
  supply: number;
  supplyDetail: Array<object>;
  metadata: object;
}
