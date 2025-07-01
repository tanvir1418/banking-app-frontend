import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCog, Edit3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProfileSettingsCard: React.FC = () => {
  const { user } = useAuth(); // Removed session as it's not directly used
  const { toast } = useToast();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // if (user?.user_metadata) {
    //   setFullName(user.user_metadata.full_name || '');
    //   setPhone(user.user_metadata.phone || '');
    //   setAddress(user.user_metadata.address || '');
    // }
    if (user) {
      setFullName(user?.email || '');
      setPhone(user?.email || '');
      setAddress(user?.email || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase.auth.updateUser({
      // data variable removed as it's not used
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
      setIsEditing(false);
    }
  };

  const displayValue = (
    value: string | undefined,
    metadataValue: string | undefined,
    placeholder: string = 'N/A'
  ) => {
    return value || metadataValue || placeholder;
  };

  return (
    <Card className='bg-card shadow-md rounded-lg'>
      <CardHeader className='flex flex-row items-center justify-between p-6'>
        <div className='flex items-center space-x-3'>
          <UserCog className='h-6 w-6 text-primary' />
          <CardTitle className='text-lg font-semibold text-card-foreground'>
            Profile Settings
          </CardTitle>
        </div>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsEditing(!isEditing)}
          aria-label={isEditing ? 'Cancel editing' : 'Edit profile'}
        >
          <Edit3 className='h-5 w-5 text-muted-foreground hover:text-primary' />
        </Button>
      </CardHeader>
      <CardContent className='p-6 space-y-4'>
        <div>
          <Label
            htmlFor='fullName'
            className='text-sm font-medium text-muted-foreground'
          >
            Full Name
          </Label>
          {isEditing ? (
            <Input
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='mt-1 bg-input text-foreground border-border'
            />
          ) : (
            <p className='text-card-foreground mt-1 text-sm'>
              {/* {displayValue(fullName, user?.user_metadata?.full_name)} */}
              {displayValue(fullName, user?.email)}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor='email'
            className='text-sm font-medium text-muted-foreground'
          >
            Email
          </Label>
          <p className='text-card-foreground mt-1 text-sm'>
            {user?.email || 'N/A'}
          </p>
        </div>
        <div>
          <Label
            htmlFor='phone'
            className='text-sm font-medium text-muted-foreground'
          >
            Phone
          </Label>
          {isEditing ? (
            <Input
              id='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='mt-1 bg-input text-foreground border-border'
            />
          ) : (
            <p className='text-card-foreground mt-1 text-sm'>
              {/* {displayValue(phone, user?.user_metadata?.phone)} */}
              {displayValue(phone, user?.email)}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor='address'
            className='text-sm font-medium text-muted-foreground'
          >
            Address
          </Label>
          {isEditing ? (
            <Input
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='mt-1 bg-input text-foreground border-border'
            />
          ) : (
            <p className='text-card-foreground mt-1 text-sm'>
              {/* {displayValue(address, user?.user_metadata?.address)} */}
              {displayValue(address, user?.email)}
            </p>
          )}
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className='p-6 border-t border-border'>
          <Button onClick={handleUpdateProfile} className='w-full'>
            Update Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileSettingsCard;
