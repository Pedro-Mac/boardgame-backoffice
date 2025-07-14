import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from '../components/pages/Login';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import { useEffect } from 'react';
import { checkAuthStatus } from '@/redux/auth/slice';
import { useAppDispatch } from '@/redux/hooks';
import Home from '@/components/pages/Home';
import Games from '@/components/pages/Games';
import Users from '@/components/pages/Users';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/games' element={<Games />} />
          <Route path='/users' element={<Users />} />
        </Route>
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
