import AbstractContextStateFactory from "./AbstractContextStateFactory";
import { Order } from "./orderTypes";


const [OrderProvider, useOrder, useSetOrder] = AbstractContextStateFactory<Order>();

export {
  OrderProvider,
  useOrder,
  useSetOrder
}