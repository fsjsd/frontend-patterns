/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { useMemo } from 'react';


// eslint-disable-next-line react/display-name
const CounterAMemo: React.VFC<{ a: number }> = React.memo(({ a }) => {
  // console.count("CounterAMemo")
  // console.log("CounterAMemo", { a })
  return (
    <div>
      <p>CounterAMemo a={a}</p>
    </div>
  )
})

const CounterABMemo: React.VFC<{ myObj: { a: number, b: number } }> = React.memo(({ myObj }) => {
  // console.count("CounterABMemo")
  // console.log("CounterABMemo", { ...myObj });
  return (
    <div>
      <p>CounterABMemo a={myObj.a} b={myObj.b}</p>
    </div>
  )
});

const CounterABUseMemo: React.VFC<{ myObj: { a: number, b: number } }> = ({ myObj }) => {
  // this is neat but still executes js in component
  return useMemo(() => {
    // console.count("CounterABUseMemo")
    // console.log("CounterABUseMemo", { ...myObj })
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

const CounterABShallowMemo: React.FC<{ myObj: { a: number, b: number } }> = React.memo(({ myObj, children }) => {
  // console.count("CounterABShallowMemo")
  // console.log("CounterABShallowMemo", { ...myObj });
  return (
    <div>
      <p>CounterABShallowMemo a={myObj.a} b={myObj.b}</p>
      {children}
    </div>
  )
}, deepMemoComparator);



const ReactMemo = () => {
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


  return (
    <div role="main" style={{ padding: "10px" }}>
      <CounterAMemo a={countObj.a} />
      {/* immutable objects re-created through react state will cause full re-render */}
      <CounterABMemo myObj={countObj} />
      {/* but memo comparing specific properties won't re-render if no change */}
      <CounterABUseMemo myObj={countObj} />
      {/* deep memo compares specific object keys */}
      <CounterABShallowMemo myObj={countObj}>children!</CounterABShallowMemo>

      <p>Container state: {countObj.a}</p>
      <button className='bg-gray' onClick={() => handleIncAClick()}>Inc A</button>
      <button className='bg-gray' onClick={() => handleIncBClick()}>Inc B</button>
      <button className='bg-gray' onClick={() => handleNoOpClick()}>Null state change</button>
    </div>
  )
}

export default ReactMemo
