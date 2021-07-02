import { useEffect } from "react";

export default function useDebounce(func, delay) {
  useEffect(() => {
    const handler = setTimeout(() => {
      func();
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [func, delay]);
}
