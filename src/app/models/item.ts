export interface Item {
  version?:string;
  id?: string;
  date?: string;
  title?: string;
  content?: string;
  tags?: string;
  owner?: string;
  locationKey?:string;
  lastModified?:string;
  func?: string;
}
