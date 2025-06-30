import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './app/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<h1>Welcome to the Board Game Backoffice</h1>}
          />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
