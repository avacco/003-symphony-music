import { useEffect, useState } from "react";

/** 
 *  Hook que es basicamente un timer.
 *  @param value valor a ser "debounced"  
 *  @param delay delay en ms. Si no se especifica, se usa el valor por defecto de 500ms.
 *  @returns el valor "debounced"
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;