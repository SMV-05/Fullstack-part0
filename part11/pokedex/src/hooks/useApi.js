import { useState, useEffect } from 'react';
import axios from 'axios';
import defaultPokemonList from '../data/pokemonList.json';

const useApi = (url) => {
  const [data, setData] = useState(defaultPokemonList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          // If fetch fails in dev / standalone front, fallback to local data
          setData(defaultPokemonList);
          setError(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useApi;
