import React from 'react'
import FieldSet from '../../ux/designsystem/FieldSet';
import InputText from '../../ux/designsystem/InputText';
import Label from '../../ux/designsystem/Label';
import Legend from '../../ux/designsystem/Legend';
import PenaltyComp from './PenaltyComp';
import { useOrder, useSetOrder } from './utils/OrderContext';
import { OrderKey, ValidationResult } from './utils/orderTypes';
// import validateOrderField from "./utils/orderValidation"

/**
 * Not much we need to pass here. The `name` is important because that's how
 * we retrieve the field's value from the form.elements when the form's
 * submitted. The wasSubmitted is useful to know whether we should display
 * all the error message even if this field hasn't been touched. But everything
 * else is managed internally which means this field doesn't experience
 * unnecessary re-renders like the SlowInput component.
 */
function FormInput({
  name,
  type = 'text',
  label,
  wasSubmitted,
  validate,
}: {
  name: OrderKey
  type?: string
  label: string
  wasSubmitted: boolean
  validate: (value: string) => ValidationResult
}) {
  const order = useOrder();
  const setOrder = useSetOrder();
  const [value, setValue] = React.useState(order[name]?.toString() || '')
  const [touched, setTouched] = React.useState(false)
  const validationResult = validate(value);
  const displayErrorMessage = (wasSubmitted || touched) && !validationResult.valid

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target?.value);
    setOrder(order => ({
      ...order,
      [name]: event.target?.value,
    }))
  }

  return (
    <FieldSet key={name}>
      {false && <PenaltyComp />}
      <Label htmlFor={`${name}-input`}>{label}</Label>{' '}
      <InputText
        id={`${name}-input`}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        pattern="[a-z]{3,10}"
        error={displayErrorMessage}
        required
        aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
      />
      {displayErrorMessage ? (
        <Legend role="alert" id={`${name}-error`} error={displayErrorMessage}>
          {validationResult.message}
        </Legend>
      ) : null}
    </FieldSet>
  )
}

export default FormInput