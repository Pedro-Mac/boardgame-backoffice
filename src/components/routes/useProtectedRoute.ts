import { useLocation } from 'react-router';

export const useProtectedRoute = () => {
  const location = useLocation();

  const titles = [
    {
      title: 'Home',
      path: '/home',
    },
    {
      title: 'Games',
      path: '/games',
    },
    {
      title: 'Users',
      path: '/users',
    },
  ];

  const getTitle = (): string => {
    console.log('params', location);
    const title = titles.find((title) =>
      location.pathname.includes(title.path)
    )?.title;

    if (!title) return 'Missing title for that path';

    return title;
  };

  return { getTitle };
};
