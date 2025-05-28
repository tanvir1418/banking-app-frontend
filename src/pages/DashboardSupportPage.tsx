
import React from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

const DashboardSupportPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          <section>
            <h1 className="text-3xl font-semibold text-foreground">Support</h1>
            <p className="text-muted-foreground">Get help with your banking needs</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Contact Support
                  </CardTitle>
                  <CardDescription>Send us a message and we'll get back to you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="How can we help you?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="Describe your issue or question..." rows={4} />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Quick Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Call Support</p>
                      <p className="text-sm text-muted-foreground">1-800-BANKING</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@banking.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <p className="font-medium">How to transfer funds?</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <p className="font-medium">Reset my password</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <p className="font-medium">Update account information</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardSupportPage;
