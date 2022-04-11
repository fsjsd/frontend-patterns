/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { useMemo } from 'react';
import Button from '../../ux/designsystem/Button';
import ButtonGroup from '../../ux/designsystem/ButtonGroup';


// eslint-disable-next-line react/display-name
export const CounterAMemo: React.VFC<{ a: number, render: () => void }> = React.memo(({ a, render }) => {
  // console.count("CounterAMemo")
  // console.log("CounterAMemo", { a })
  render();
  return (
    <div>
      <p>CounterAMemo a={a}</p>
    </div>
  )
})

export const CounterABMemo: React.VFC<{ myObj: { a: number, b: number }, render: () => void }> = React.memo(({ myObj, render }) => {
  // console.count("CounterABMemo")
  // console.log("CounterABMemo", { ...myObj });
  render();
  return (
    <div>
      <p>CounterABMemo a={myObj.a} b={myObj.b}</p>
    </div>
  )
});

export const CounterABUseMemo: React.VFC<{ myObj: { a: number, b: number }, render: () => void }> = ({ myObj, render }) => {
  // this is neat but still executes js in component
  return useMemo(() => {
    // console.count("CounterABUseMemo")
    // console.log("CounterABUseMemo", { ...myObj })
    render(); // within useMemo, component still renders
    return (
      <div>
        <p>CounterABUseMemo a={myObj.a} b={myObj.b}</p>
      </div>
    )
  }, [myObj.a, myObj.b]);
}

const deepMemoComparator = <T,>(prev: Readonly<React.PropsWithChildren<T>>, next: Readonly<React.PropsWithChildren<T>>): boolean => {
  // const propKeys = Object.keys(prev).filter(key => key !== "children");
  const areEqual: boolean = Object.keys(prev).every((key) => {
    if (key === "children") {
      return true; // skip React children prop
    } else if (typeof prev[key as keyof T] === "object") {
      return deepMemoComparator(prev[key as keyof T], next[key as keyof T])
    } else {
      return prev[key as keyof T] === next[key as keyof T]
    }
  });
  //console.log(Object.keys(prev), prev, next, areEqual)
  return areEqual;
}

/*
const shallowMemoComparator = <T,>(prev: Readonly<React.PropsWithChildren<T>>, next: Readonly<React.PropsWithChildren<T>>) => {
  const areEqual = Object.keys(prev).filter(key => key !== "children").every((key) => prev[key as keyof T] === next[key as keyof T]);
  // console.log(Object.keys(prev), prev, next, areEqual)
  return areEqual;
}
*/

export const CounterABDeepMemo: React.FC<{ myObj: { a: number, b: number }, render: () => void }> = React.memo(({ myObj, render, children }) => {
  // console.count("CounterABShallowMemo")
  // console.log("CounterABShallowMemo", { ...myObj });
  render();
  return (
    <div>
      <p>CounterABShallowMemo a={myObj.a} b={myObj.b}</p>
      {children}
    </div>
  )
}, deepMemoComparator);



export const ReactMemo = () => {
  const [countObj, setCountObj] = useState({
    a: 0, b: 0, c: () => {
      // no op
    }
  });

  const handleIncAClick = () => {
    setCountObj((prev) => ({ ...prev, a: prev.a + 1 }))
  };
  const handleIncBClick = () => {
    setCountObj((prev) => ({ ...prev, b: prev.b + 1 }))
  };
  const handleNoOpClick = () => {
    setCountObj((prev) => ({ ...prev }))
  };

  const render = (component) => () => {
    console.log(component);
  }

  return (
    <div role="main" style={{ padding: "10px" }}>
      <CounterAMemo a={countObj.a} render={render('CounterAMemo')} />
      {/* immutable objects re-created through react state will cause full re-render */}
      <CounterABMemo myObj={countObj} render={render('CounterABMemo')} />
      {/* but memo comparing specific properties won't re-render if no change */}
      <CounterABUseMemo myObj={countObj} render={render('CounterABUseMemo')} />
      {/* deep memo compares specific object keys */}
      <CounterABDeepMemo myObj={countObj} render={render('CounterABShallowMemo')}>children!</CounterABDeepMemo>

      <p>Container state: {countObj.a}</p>
      <ButtonGroup>
        <Button className='bg-gray' onClick={() => handleIncAClick()}>Inc A</Button>
        <Button className='bg-gray' onClick={() => handleIncBClick()}>Inc B</Button>
        <Button className='bg-gray' onClick={() => handleNoOpClick()}>Null state change</Button>
      </ButtonGroup>
    </div>
  )
}

export default ReactMemo
