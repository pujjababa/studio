import { Sparkles } from 'lucide-react';
import { PujaPlannerClient } from './PujaPlannerClient';

export default function PujaPlannerPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Sparkles className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            AI Puja Planner
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Describe your purpose, and let our intelligent assistant recommend the perfect puja and find an auspicious date for you.
          </p>
        </div>
        
        <PujaPlannerClient />
        
      </div>
    </div>
  );
}
