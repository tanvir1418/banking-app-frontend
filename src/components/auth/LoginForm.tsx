import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Label not explicitly used if FormLabel is preferred
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Fingerprint, Smartphone, ShieldCheck, User, Lock } from 'lucide-react'; // Added User and Lock

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
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
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: 'Login Error',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-xl"> {/* Ensured bg-white for contrast, added shadow */}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle> {/* Explicit text color */}
        <CardDescription className="text-gray-600">Sign in to access your account</CardDescription> {/* Explicit text color */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email or Username</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 h-5 w-5 text-gray-400" />
                      <Input 
                        placeholder="Enter your email or username" 
                        {...field} 
                        className="pl-10 text-gray-900 placeholder-gray-500" // Added padding for icon and text color
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <Button variant="link" type="button" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700" onClick={() => {/* TODO: Forgot password */}}>
                      Forgot password?
                    </Button>
                  </div>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 h-5 w-5 text-gray-400" />
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Enter your password" 
                        {...field} 
                        className="pl-10 text-gray-900 placeholder-gray-500" // Added padding for icon and text color
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="rememberMe"/>
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="rememberMe" className="text-gray-700">Remember me for 30 days</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}> {/* Adjusted button color */}
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" /> {/* Adjusted border color */}
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">or continue with</span> {/* Ensured bg-white and text color */}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700" disabled={loading}> {/* Adjusted outline button colors */}
            <Fingerprint className="mr-2 h-4 w-4" /> Fingerprint
          </Button>
          <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700" disabled={loading}> {/* Adjusted outline button colors */}
            <Smartphone className="mr-2 h-4 w-4" /> Mobile App
          </Button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500"> {/* Adjusted text color */}
          Don't have an account?{' '}
          <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700" onClick={onSwitchToRegister} disabled={loading}>
            Create account
          </Button>
        </p>
        <div className="mt-6 flex items-center justify-center text-xs text-gray-500"> {/* Adjusted text color */}
          <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
          <span>Secured by 256-bit encryption. We protect your financial data.</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
