import { useEffect } from "react";

export const useEffectAsync = (effect: () => void, deps: any[]) => {
  useEffect(() => {
    (async () => {
      effect();
    })();
  }, deps);
};