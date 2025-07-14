import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const LandingPage = () => {
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <div>
      <h1>Landing Page</h1>
      {isLoading ? (
        <div>
          <span>Loading</span>
        </div>
      ) : null}
      {isLoading || isAuthenticated ? null : <Link to='/login'>Login</Link>}
    </div>
  );
};

export default LandingPage;
