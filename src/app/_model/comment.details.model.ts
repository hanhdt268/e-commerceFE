import {Product} from "./product.model";

export interface CommentDetails {
  comId: number
  content: string,
  data: Date,
  product: Product,
  user: any
}
