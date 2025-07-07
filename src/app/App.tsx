import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from '../components/pages/Login';
import LandingPage from '../components/pages/LandingPage';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { useCallback, useEffect } from 'react';
import { checkAuthStatus } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/hooks';

function App() {
  const dispatch = useAppDispatch();

  const checkAuthStatusCb = useCallback(async () => {
    return dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    checkAuthStatusCb();
  }, [checkAuthStatusCb]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
