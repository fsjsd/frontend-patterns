import { OrderSide, ValidationResult } from "./orderTypes";

const validations = {
  security: (value: string): ValidationResult => {
    if(value === undefined || value === '') {
      return {
        valid: false,
        message: 'Security required'
      };
    }
    return { valid: true };
  },
  limitprice: (value: string): ValidationResult => {
    if(value === undefined || value === '') {
      return {
        valid: false,
        message: 'Limit price required'
      };
    }
    const limitprice = parseFloat(value);
    if(limitprice < 0) {
      return {
        valid: false,
        message: 'Limit price must be greater than 0'
      };
    }
    return { valid: true };
  },
  quantity: (value: string, side: OrderSide, availableFunds: number, securityPrice: number, holdings?: number): ValidationResult => {
    if(value === undefined || value === '') {
      return {
        valid: false,
        message: 'Quantity required'
      };
    }
    const quantity = parseFloat(value);
    if(quantity < 0) {
      return {
        valid: false,
        message: 'Quantity must be greater than 0'
      };
    }
    if(holdings !== undefined && side === OrderSide.sell && quantity > holdings) {
      return {
        valid: false,
        message: 'Quantity exceeds holdings'
      };
    }
    if(holdings !== undefined && side === OrderSide.buy && (quantity * securityPrice) > availableFunds) {
      return {
        valid: false,
        message: 'Quantity exceeds available funds'
      };
    }
    return { valid: true };
  }
}

export default validations;

/*

function validateOrderField (key: OrderKey, value: string | undefined) : ValidationResult {
  if(key === 'limitprice') {
    if(value === undefined || value === '') {
      return {
        valid: false,
        message: 'Limit price required'
      };
    }
    const limitprice = parseFloat(value);
    if(limitprice < 0) {
      return {
        valid: false,
        message: 'Limit price must be greater than 0'
      };
    }
  }
  return { valid: true };
}


export default validateOrderField;
*/