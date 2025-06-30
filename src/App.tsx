import { useActionState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { handleLoginSucceeds } from './redux/auth/slice';
import { fetchData } from './utils/httpUtils';

function App() {
  const [isLoggedIn, formAction, isPending] = useActionState(
    handleLogin,
    false
  );

  const dispatch = useDispatch();

  async function handleLogin(_: boolean, formData: FormData): Promise<boolean> {
    try {
      const data = await fetchData<{ accessToken: string }>(
        'https://boardgames-bje7.onrender.com/auth/backoffice/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        }
      );

      if (!data.accessToken) {
        throw new Error('No access token received');
      }

      dispatch({
        type: handleLoginSucceeds.type,
        payload: {
          authToken: data.accessToken,
          expirationAt: '',
        },
      });

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({
        type: 'auth/handleLoginFails',
      });
      return false;
    }
  }

  return (
    <>
      {isPending ? <p>Loading...</p> : null}
      <form action={formAction}>
        <label>
          Email:
          <input type='text' name='email' required />
        </label>
        <br />
        <label>
          Password:
          <input type='password' name='password' required />
        </label>
        <br />
        <button type='submit'>Login</button>
        {isLoggedIn ? <p>Login successful!</p> : null}
      </form>
    </>
  );
}

export default App;
