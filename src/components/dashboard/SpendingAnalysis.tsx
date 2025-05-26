
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const pieData = [
  { name: 'Housing', value: 400, color: '#3B82F6' }, // blue-500
  { name: 'Food', value: 300, color: '#60A5FA' },    // blue-400
  { name: 'Transportation', value: 200, color: '#93C5FD' }, // blue-300
  { name: 'Entertainment', value: 100, color: '#BFDBFE' }, // blue-200
];

const barData = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 2000, expenses: 3800 },
  { month: 'Apr', income: 2780, expenses: 2908 },
  { month: 'May', income: 1890, expenses: 2800 },
];

const SpendingAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <CardTitle className="text-xl font-semibold">Spending Analysis</CardTitle>
        <div className="flex space-x-1 p-1 bg-slate-100 rounded-md mt-2 sm:mt-0">
          {(['Monthly', 'Quarterly', 'Yearly'] as const).map(tab => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-slate-200'}`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Expense Breakdown</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Income vs Expenses</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={barData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`}/>
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="income" fill="#3B82F6" name="Income" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#FDBA74" name="Expenses" radius={[4, 4, 0, 0]} /> {/* orange-300 */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingAnalysis;
