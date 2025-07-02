import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from './useLogin';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { formAction, isLoggedIn, isPending } = useLogin();
  return (
    <div>
      <h2>Login</h2>
      {isPending ? <p>Loading...</p> : null}
      <form onSubmit={formAction}>
        <div className='mb-4'>
          <Label className='mb-1' htmlFor='email'>
            Email
          </Label>
          <Input type='email' id='email' name='email' placeholder='Email' />
        </div>
        <div className='mb-4'>
          <Label className='mb-1' htmlFor='password'>
            Password
          </Label>
          <Input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
          />
        </div>
        <Button className='cursor-pointer' type='submit'>
          Login
        </Button>
        {isLoggedIn ? <p>Login successful!</p> : null}
      </form>
    </div>
  );
};

export default Login;
