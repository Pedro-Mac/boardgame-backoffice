import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isLoading, setLoading, setUser } = useAuthStore((state) => state);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // Simulate an async operation
    const response = await fetch(
      'https://api.tabletopburrow.com/auth/backoffice/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      }
    );

    console.log('Response:', response);

    const data = await response.json();

    setLoading(false);
    setUser({
      id: data.user.id,
      email: email,
      name: data.user.name,
    });

    navigate({ to: '/admin/users' });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <Input
            type='email'
            placeholder='Email'
            className='mb-2'
            name='email'
            value={email}
            onChange={handleInputChange}
          />
          <Input
            type='password'
            placeholder='Password'
            className='mb-2'
            name='password'
            value={password}
            onChange={handleInputChange}
          />
          <Button variant='secondary' disabled={isLoading}>
            Submit
          </Button>
        </form>
      </main>
    </>
  );
}
