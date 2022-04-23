

type KeyOf<T extends object> = Extract<keyof T, string>;

type ValueOf<T> = T[keyof T];

export enum OrderSide {
  buy = 'buy',
  sell = 'sell'
}
export interface Order {
  security: string;
  side: OrderSide;
  limitprice: number;
  quantity: number;
}

export type OrderKey = KeyOf<Order>;
export type OrderValue = ValueOf<Order>;

export interface ValidationResult {
  valid: boolean;
  message?: string
}