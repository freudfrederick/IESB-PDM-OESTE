import { useEffect, useState } from 'react';

// Devolve o valor só depois de `delay` ms sem mudanças.
// A limpeza do timeout cancela a espera anterior a cada novo valor.
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
