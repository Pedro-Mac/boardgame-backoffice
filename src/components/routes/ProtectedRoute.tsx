import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading component
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default ProtectedRoute;
