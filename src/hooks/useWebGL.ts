import { useMemo } from "react";

/**
 * Detects WebGL support once per session so 3D scenes can fall back to the
 * existing CSS backgrounds on devices/contexts that can't run WebGL.
 */
export function useSupportsWebGL(): boolean {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      const attrs = { failIfMajorPerformanceCaveat: false };
      const gl2 = canvas.getContext("webgl2", attrs);
      if (gl2) return true;
      const gl1 = canvas.getContext("webgl", attrs) || canvas.getContext("experimental-webgl", attrs);
      return Boolean(gl1);
    } catch {
      return false;
    }
  }, []);
}
