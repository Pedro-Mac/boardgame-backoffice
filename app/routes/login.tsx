import { useState } from 'react';
import type { Route } from '../+types/root';
import { Button } from '~/components/ui/button';
import { redirect, useFetcher } from 'react-router';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { getUrl } from '~/utils/api';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Tabletop Burrow Backoffice' }];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  try {
    const res = await fetch(getUrl('/auth/backoffice/login'), {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Login failed');
    const data: { user: { id: number; name: string; created_at: string } } =
      await res.json();

    localStorage.setItem('user', JSON.stringify(data.user.id)); // Store user info

    return redirect('/home');
  } catch (error) {
    console.error('Login failed:', error);
  }
}

export default function Login() {
  const fetcher = useFetcher();
  let busy = fetcher.state !== 'idle';

  return (
    <div>
      <fetcher.Form method='post'>
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
        <Button type='submit' disabled={busy}>
          Login
        </Button>
      </fetcher.Form>
    </div>
  );
}
