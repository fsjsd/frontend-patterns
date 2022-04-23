import React from 'react'
import Button from '../../ux/designsystem/Button';
import FormInput from './FormInput';
import { TradingWrapper } from './TradingStyles'
import { Order, OrderSide } from './utils/orderTypes';
import validations from './utils/orderValidation';
import { OrderProvider, useOrder } from './utils/OrderContext';

const initialOrder: Order = {
  security: 'AAPL',
  side: OrderSide.buy,
  limitprice: 20,
  quantity: 100,
}

const TradingForm = () => {
  const order = useOrder();
  const [wasSubmitted, setWasSubmitted] = React.useState(false)
  const [availableFunds, setAvailableFunds] = React.useState(4000)
  const [holdings, setHoldings] = React.useState({
    "AAPL": 120,
    "GOOG": 23,
  })
  const [securityPrice, setSecurityPrice] = React.useState(90)

  /*
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries())

    const formIsValid = Array.from(formData.keys()).every(
      (key: string) => {
        const value = formData.get(key)?.valueOf() as string | undefined;
        //return validateOrderField(key as OrderKey, value).valid
        return true;
      },
    )

    setWasSubmitted(true)
    if (formIsValid) {
      console.log(`Fast Form Submitted (valid)`, fieldValues)
    } else {
      console.warn(`Fast Form Submitted (invalid)`, fieldValues)
    }
  }
  */

  return <TradingWrapper>
    <form noValidate>
      {JSON.stringify(order)}
      <FormInput
        type="text"
        label="Security"
        name={"security"}
        wasSubmitted={wasSubmitted}
        validate={value => validations.security(value)}
      />
      <div>
        <label>Holdings: {holdings[order.security]}</label>
      </div>
      <FormInput
        type="number"
        label="Limit price"
        name={"limitprice"}
        wasSubmitted={wasSubmitted}
        validate={value => validations.limitprice(value)}
      />
      <FormInput
        type="number"
        label="Quantity"
        name={"quantity"}
        wasSubmitted={wasSubmitted}
        validate={value => validations.quantity(value, order.side, availableFunds, securityPrice, holdings[order.security])}
      />
      <Button type="submit">Submit</Button>
    </form>
  </TradingWrapper>

}

const Trading = () => {
  return (
    <OrderProvider value={initialOrder}>
      <TradingForm />
    </OrderProvider>
  )
}

export default Trading