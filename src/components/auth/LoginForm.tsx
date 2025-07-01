import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone,
  ShieldCheck,
  User,
  Lock,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional(),
});

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      await login({
        email: values.email,
        password: values.password,
      });
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      navigate('/dashboard');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description:
          error?.response?.data?.message ||
          error.message ||
          'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-md bg-card text-card-foreground shadow-xl dark:shadow-2xl rounded-lg'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-bold'>Welcome Back</CardTitle>
        <CardDescription className='text-muted-foreground'>
          Sign in to access your account
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
                  <FormLabel className='text-muted-foreground'>Email</FormLabel>
                  <FormControl>
                    <div className='relative flex items-center'>
                      <User className='absolute left-3 h-5 w-5 text-muted-foreground' />
                      <Input
                        placeholder='Enter your email'
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
                  <div className='flex justify-between items-center'>
                    <FormLabel className='text-muted-foreground'>
                      Password
                    </FormLabel>
                    <Button
                      variant='link'
                      type='button'
                      className='p-0 h-auto text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <FormControl>
                    <div className='relative flex items-center'>
                      <Lock className='absolute left-3 h-5 w-5 text-muted-foreground' />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
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

            <FormField
              control={form.control}
              name='rememberMe'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id='rememberMe'
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel
                      htmlFor='rememberMe'
                      className='text-muted-foreground'
                    >
                      Remember me for 30 days
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600'
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>

        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-border' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-card px-2 text-muted-foreground'>
              or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Button
            variant='outline'
            className='w-full border-blue-600 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300'
            disabled={loading}
          >
            <Fingerprint className='mr-2 h-4 w-4' /> Fingerprint
          </Button>
          <Button
            variant='outline'
            className='w-full border-blue-600 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300'
            disabled={loading}
          >
            <Smartphone className='mr-2 h-4 w-4' /> Mobile App
          </Button>
        </div>

        <p className='mt-6 text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Button
            variant='link'
            className='p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
            onClick={onSwitchToRegister}
            disabled={loading}
          >
            Create account
          </Button>
        </p>

        <div className='mt-6 flex items-center justify-center text-xs text-muted-foreground'>
          <ShieldCheck className='mr-2 h-4 w-4 text-green-500 dark:text-green-400' />
          <span>Secured by 256-bit encryption</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
