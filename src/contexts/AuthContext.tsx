
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<AuthError | null>;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = userRole === 'admin';

  const fetchUserRole = async (userId: string) => {
    try {
      console.log('Fetching role for user:', userId);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      
      console.log('User role data:', data);
      return data?.role || null;
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return null;
    }
  };

  const refreshUserRole = async () => {
    if (user) {
      const role = await fetchUserRole(user.id);
      console.log('Refreshed user role:', role);
      setUserRole(role);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const role = await fetchUserRole(session.user.id);
        console.log('Initial user role:', role);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      
      setIsLoading(false);
      console.log("AuthContext: getSession completed", session);
    }).catch(error => {
      console.error("AuthContext: error in getSession", error);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("AuthContext: onAuthStateChange triggered", _event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Add a small delay to ensure the user_roles trigger has executed
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            console.log('Auth state change - user role:', role);
            setUserRole(role);
            setIsLoading(false);
          }, 500);
        } else {
          setUserRole(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async (): Promise<AuthError | null> => {
    console.log("AuthContext: signOut called");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("AuthContext: error signing out", error);
    } else {
      setSession(null);
      setUser(null);
      setUserRole(null);
      console.log("AuthContext: signOut successful");
    }
    return error;
  };

  const value = {
    session,
    user,
    userRole,
    isLoading,
    isAdmin,
    signOut,
    refreshUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
