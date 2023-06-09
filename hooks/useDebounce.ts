import { useEffect, useState } from "react";

/* Hook que es basicamente un timer. Recibe un valor y un delay. Si no se ha enviado un delay, se usa el valor por defecto de 500ms  */
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