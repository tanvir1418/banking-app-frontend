
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useTheme } from '@/contexts/ThemeProvider'; // Import useTheme

// Colors for charts - consider deriving from theme if possible or ensuring good contrast
const PIE_COLORS_LIGHT = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE']; // blues
const PIE_COLORS_DARK = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD']; // darker blues

const BAR_INCOME_LIGHT = '#3B82F6'; // blue-500
const BAR_EXPENSES_LIGHT = '#FDBA74'; // orange-300

const BAR_INCOME_DARK = '#60A5FA'; // blue-400
const BAR_EXPENSES_DARK = '#F97316'; // orange-500


const pieData = [
  { name: 'Housing', value: 400 },
  { name: 'Food', value: 300 },
  { name: 'Transportation', value: 200 },
  { name: 'Entertainment', value: 100 },
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
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const currentPieColors = isDarkMode ? PIE_COLORS_DARK : PIE_COLORS_LIGHT;
  const currentBarIncomeColor = isDarkMode ? BAR_INCOME_DARK : BAR_INCOME_LIGHT;
  const currentBarExpensesColor = isDarkMode ? BAR_EXPENSES_DARK : BAR_EXPENSES_LIGHT;
  
  const legendColor = isDarkMode ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))'; // Adjust for better visibility

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <CardTitle className="text-xl font-semibold text-card-foreground">Spending Analysis</CardTitle>
        <div className="flex space-x-1 p-1 bg-muted rounded-md mt-2 sm:mt-0">
          {(['Monthly', 'Quarterly', 'Yearly'] as const).map(tab => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs ${activeTab === tab ? 'shadow-md' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-md font-medium text-card-foreground mb-2">Expense Breakdown</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={currentPieColors[index % currentPieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                  />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', color: legendColor }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-md font-medium text-card-foreground mb-2">Income vs Expenses</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={barData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                  <XAxis dataKey="month" fontSize={12} tick={{ fill: legendColor }} />
                  <YAxis fontSize={12} tickFormatter={(value) => `$${value/1000}k`} tick={{ fill: legendColor }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', color: legendColor }} />
                  <Bar dataKey="income" fill={currentBarIncomeColor} name="Income" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill={currentBarExpensesColor} name="Expenses" radius={[4, 4, 0, 0]} />
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
