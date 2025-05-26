
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ExternalTransferContent: React.FC = () => {
  return (
    <Card className="shadow-lg mt-4 bg-white md:max-w-3xl lg:max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-gray-800 text-xl">External Transfers</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">External transfer functionality coming soon. This section will allow you to send funds to accounts outside of this bank.</p>
      </CardContent>
    </Card>
  );
};

export default ExternalTransferContent;
