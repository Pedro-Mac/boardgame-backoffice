import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from './useLogin';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

const Login = () => {
  const { formAction, isLoading } = useLogin();

  console.log({ isLoading });
  return (
    <div>
      <h2>Login</h2>

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
        {isLoading ? (
          <Button className='cursor-pointer' type='submit' disabled>
            <Loader2Icon className='animate-spin' />
            Login
          </Button>
        ) : (
          <Button className='cursor-pointer' type='submit'>
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default Login;
