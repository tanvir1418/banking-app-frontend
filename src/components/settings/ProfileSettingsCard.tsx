
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCog, Edit3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProfileSettingsCard: React.FC = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.user_metadata) {
      setFullName(user.user_metadata.full_name || '');
      setPhone(user.user_metadata.phone || '');
      setAddress(user.user_metadata.address || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone, address },
    });

    if (error) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been successfully updated.',
      });
      // Manually update user context if needed or rely on onAuthStateChange to refresh
      // For immediate UI update, you might want to update user in AuthContext or re-fetch
      setIsEditing(false); 
    }
  };

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <UserCog className="h-6 w-6 text-blue-600" />
          <CardTitle className="text-lg font-semibold text-gray-700">Profile Settings</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
          <Edit3 className="h-5 w-5 text-gray-500 hover:text-blue-600" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-600">Full Name</Label>
          {isEditing ? (
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 bg-white" />
          ) : (
            <p className="text-gray-800 mt-1">{fullName || user?.user_metadata?.full_name || 'N/A'}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-600">Email</Label>
          <p className="text-gray-800 mt-1">{user?.email || 'N/A'}</p>
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-600">Phone</Label>
           {isEditing ? (
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 bg-white" />
          ) : (
            <p className="text-gray-800 mt-1">{phone || user?.user_metadata?.phone || 'N/A'}</p>
          )}
        </div>
        <div>
          <Label htmlFor="address" className="text-sm font-medium text-gray-600">Address</Label>
           {isEditing ? (
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 bg-white" />
          ) : (
            <p className="text-gray-800 mt-1">{address || user?.user_metadata?.address || 'N/A'}</p>
          )}
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="p-4 border-t">
          <Button onClick={handleUpdateProfile} className="w-full bg-blue-600 hover:bg-blue-700">Update Profile</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileSettingsCard;

