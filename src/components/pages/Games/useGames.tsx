import { fetchData } from '@/api/api';
import { useEffect } from 'react';

export const useGames = () => {
  useEffect(() => {
    const getGames = () => {
      return fetchData('/games/');
    };

    getGames()
      .then((games) => {
        console.log('Fetched games:', games);
      })
      .catch((error) => {
        console.error('Error fetching games:', error);
      });
  }, []);
  return {};
};
