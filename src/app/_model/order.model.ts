import {Product} from "./product.model";

export interface MyOrderDetails {
  oderId: number,
  oderFullName: string,
  oderFullOder: string,
  oderContactNumber: string,
  note: string,
  quantity: number
  oderAmount: number,
  oderStatus: string,
  orderDate: Date
  product: Product,
  user: any
}
