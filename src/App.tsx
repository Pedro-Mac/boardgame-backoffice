import { useActionState, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const handleLogin = (previousState, formData) => {};

function App() {
  const [state, formAction] = useActionState((): boolean => true, false);
  return <></>;
}

export default App;
