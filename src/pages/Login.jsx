import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import loginPageData from '../data/loginPageData.json';

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // mock auth
    const user = { email, name: name || 'مستخدم' };
    localStorage.setItem('khuta_user', JSON.stringify(user));
    navigate('/profile');
  }

  return (
    <div className="max-w-md bg-khuta-neutral-100 p-6 rounded shadow-sm">
      <h1 className="text-h3 font-bold text-khuta-primary-700 mb-6">{loginPageData.title}</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
            <label htmlFor="login-name" className="block text-body-sm text-khuta-neutral-700 mb-1">{loginPageData.nameLabel}</label>
            <input
                id="login-name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-khuta-neutral-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-khuta-primary-500 dark:bg-khuta-neutral-700 dark:text-khuta-neutral-100"
                aria-label={loginPageData.nameLabel}
                type="text"
            />
        </div>
        <div>
            <label htmlFor="login-email" className="block text-body-sm text-khuta-neutral-700 mb-1">{loginPageData.emailLabel}</label>
            <input
                id="login-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                required
                className="w-full border border-khuta-neutral-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-khuta-primary-500 dark:bg-khuta-neutral-700 dark:text-khuta-neutral-100"
                aria-label={loginPageData.emailLabel}
            />
        </div>
        <div>
          <Button type="submit" variant="primary" size="md" fullWidth ariaLabel={loginPageData.buttonText}>{loginPageData.buttonText}</Button>
        </div>
      </form>
    </div>
  );
}