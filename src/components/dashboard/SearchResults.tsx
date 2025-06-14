
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Building, Receipt } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'transaction' | 'account' | 'payment';
  title: string;
  description: string;
  amount?: number;
  date?: string;
  status?: string;
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  onClearSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onClearSearch }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return Receipt;
      case 'account':
        return Building;
      case 'payment':
        return CreditCard;
      default:
        return Receipt;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'bg-blue-100 text-blue-800';
      case 'account':
        return 'bg-green-100 text-green-800';
      case 'payment':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!query) return null;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Search Results for "{query}" ({results.length} found)
        </h2>
        <button
          onClick={onClearSearch}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear Search
        </button>
      </div>
      
      {results.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No results found for "{query}"</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {results.map((result) => {
            const IconComponent = getIcon(result.type);
            return (
              <Card key={result.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{result.title}</h3>
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                      {result.date && (
                        <p className="text-xs text-muted-foreground mt-1">{result.date}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(result.type)}>
                      {result.type}
                    </Badge>
                    {result.amount && (
                      <span className="font-medium">
                        ${Math.abs(result.amount).toFixed(2)}
                      </span>
                    )}
                    {result.status && (
                      <Badge variant="outline" className="text-xs">
                        {result.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
