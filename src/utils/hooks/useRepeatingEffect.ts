import { useEffect, useState } from "react";

export const useRepeatingEffect = (effect: () => void, timeout: number) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  useEffect(() => {
    (async () => {
      console.log("get webvital", intervalId)
      await effect();
      const interval = setTimeout(() => {
        setIntervalId(interval); //trigger re-run
      }, timeout);
    })();
    return () => {
      intervalId && clearTimeout(intervalId)
    }
  }, [effect, intervalId, timeout])
};