import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff, Shield, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { AuthResponse } from '@/types/auth';
import { toast } from 'sonner';

const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

interface AdminLoginFormProps {
  onSwitchToUser: () => void;
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSwitchToUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser, setUserRole } = useAuth();

  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof adminLoginSchema>) => {
    setLoading(true);
    try {
      const res = await api.post<AuthResponse>('/public/login', {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setUserRole(res.data.user.role);

      if (res.data.user.role === 'admin') {
        toast.success('Admin Login Successful', {
          description: 'Welcome to the admin dashboard!',
        });
        navigate('/admin', { replace: true });
      } else {
        toast.error('Access Denied', {
          description: 'You are not an administrator.',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Admin Login Failed', {
        description:
          error?.response?.data?.message ||
          error.message ||
          'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-md bg-card text-card-foreground shadow-xl dark:shadow-2xl rounded-lg border-2 border-red-200 dark:border-red-800'>
      <CardHeader className='text-center'>
        <div className='flex items-center justify-center mb-2'>
          <Shield className='h-8 w-8 text-red-600 dark:text-red-400' />
        </div>
        <CardTitle className='text-2xl font-bold text-red-600 dark:text-red-400'>
          Administrator Login
        </CardTitle>
        <CardDescription className='text-muted-foreground'>
          Sign in with admin credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground'>
                    Admin Email
                  </FormLabel>
                  <FormControl>
                    <div className='relative flex items-center'>
                      <User className='absolute left-3 h-5 w-5 text-muted-foreground' />
                      <Input
                        placeholder='Enter admin email'
                        {...field}
                        className='pl-10 bg-background text-card-foreground placeholder:text-muted-foreground'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground'>
                    Admin Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative flex items-center'>
                      <Lock className='absolute left-3 h-5 w-5 text-muted-foreground' />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter admin password'
                        {...field}
                        className='pl-10 bg-background text-card-foreground placeholder:text-muted-foreground'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-accent-foreground'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600'
              disabled={loading}
            >
              {loading ? 'Signing In as Admin...' : 'Sign In as Administrator'}
            </Button>
          </form>
        </Form>

        <p className='mt-6 text-center text-sm text-muted-foreground'>
          Not an administrator?{' '}
          <Button
            variant='link'
            className='p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
            onClick={onSwitchToUser}
            disabled={loading}
          >
            User Login
          </Button>
        </p>

        <div className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800'>
          <p className='text-xs text-red-600 dark:text-red-400 text-center'>
            <Shield className='inline h-3 w-3 mr-1' />
            Administrator access only. Unauthorized access is prohibited.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminLoginForm;
