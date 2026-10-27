import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get('posts?_limit=10');
      setNotices(data);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os avisos.');
    } finally {
      // roda no sucesso e no erro: o carregamento sempre termina
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { notices, isLoading, error, reload: load };
}
