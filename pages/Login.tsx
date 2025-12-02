import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Label } from '../components/ui';
import { Icons } from '../components/Icons';

export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md border-neon/20 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-neon rounded-full flex items-center justify-center mb-4">
            <Icons.LayoutDashboard className="text-neon-foreground w-6 h-6" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-muted-foreground text-sm">Enter your password to access the dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
            <Button type="submit" className="w-full">
              Access Dashboard
            </Button>
            <div className="text-center pt-2">
              <Button type="button" variant="link" onClick={() => navigate('/')} className="text-xs text-muted-foreground">
                Back to Portfolio
              </Button>
            </div>
            <div className="text-center text-[10px] text-muted-foreground/50">
               Hint: admin123
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};