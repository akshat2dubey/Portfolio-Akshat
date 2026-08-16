import { useEffect, useState } from "react";

/** True on touch/coarse-pointer devices and very small screens. */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setIsMobile(query.matches || window.innerWidth < 768);
    update();
    query.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isMobile;
}
