import {OrderQuantity} from "./order-quantity.model";

export interface OderDetails {
  fullName: string;
  fullAddress: string;
  contactNumber: string;
  note: string;
  paymentMethod: string,
  quantity: any;
  orderDate: Date
  oderProductQuantityList: OrderQuantity[];
}
