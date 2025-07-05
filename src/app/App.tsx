import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/pages/Login';
import LandingPage from '../components/pages/LandingPage';
import ProtectedRoute from '@/components/routes/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute isAuthenticated={false}>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
