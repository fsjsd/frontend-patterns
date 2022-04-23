import React, { ReactNode } from 'react'

/*

const PasswordContext = React.createContext<string | null>(null)
const SetPasswordContext = React.createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null)

function PasswordProvider({children}: {children: React.ReactNode}) {
  const [password, setPassword] = React.useState('')

  return (
    <PasswordContext.Provider value={password}>
      <SetPasswordContext.Provider value={setPassword}>
        {children}
      </SetPasswordContext.Provider>
    </PasswordContext.Provider>
  )
}

function usePassword() {
  const password = React.useContext(PasswordContext)
  if (password === null) {
    throw new Error(
      'usePassword must be used in a decendent of PasswordProvider',
    )
  }
  return password
}

function useSetPassword() {
  const setPassword = React.useContext(SetPasswordContext)
  if (setPassword === null) {
    throw new Error(
      'usePassword must be used in a decendent of PasswordProvider',
    )
  }
  return setPassword
}*/

// function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

type AbstractContextStateFactoryResult<T> = [
  ({ value, children }: { value: T, children: React.ReactNode }) => JSX.Element,
  () => T,
  () => React.Dispatch<React.SetStateAction<T>>
];

function AbstractContextStateFactory<T>(): AbstractContextStateFactoryResult<T> {
  const ValueContext = React.createContext<T | null>(null)
  const SetValueContext = React.createContext<React.Dispatch<
    React.SetStateAction<T>
  > | null>(null)

  function AbstractProvider({ value, children }: { value: T, children: React.ReactNode }) {
    const [val, setVal] = React.useState<T>(value)

    return (
      <ValueContext.Provider value={val}>
        <SetValueContext.Provider value={setVal}>
          {children}
        </SetValueContext.Provider>
      </ValueContext.Provider>
    )
  }

  function useValue() {
    const password = React.useContext(ValueContext)
    if (password === null) {
      throw new Error(
        'use{Value} must be used in a decendent of Provider',
      )
    }
    return password
  }

  function useSetValue() {
    const setValue = React.useContext(SetValueContext)
    if (setValue === null) {
      throw new Error(
        'useSet{Value} must be used in a decendent of Provider',
      )
    }
    return setValue
  }

  return [AbstractProvider, useValue, useSetValue];
}


export default AbstractContextStateFactory;