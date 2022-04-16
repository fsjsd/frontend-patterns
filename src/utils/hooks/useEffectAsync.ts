/* istanbul ignore file */
import { useEffect } from "react";

/**
 * Simple IIFE wrapper for async useEffect
 * @param effect function body to run
 * @param deps dependency array for useEffect
 */
export const useEffectAsync = (effect: () => void, deps: unknown[]) => {
  useEffect(() => {
    (async () => {
      effect();
    })();
  }, deps);
};
