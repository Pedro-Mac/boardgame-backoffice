import {
  type RouteConfig,
  route,
  index,
  layout,
} from '@react-router/dev/routes';

export default [
  index('routes/login.tsx'),
  layout('./routes/protected-route.tsx', [
    route('/home', './routes/home.tsx'),
    route('/games', './routes/games.tsx'),
  ]),
] satisfies RouteConfig;
