/* istanbul ignore file */
import { useEffect } from "react";

export const useEffectAsync = (effect: () => void, deps: unknown[]) => {
  useEffect(() => {
    (async () => {
      effect();
    })();
  }, deps);
};
