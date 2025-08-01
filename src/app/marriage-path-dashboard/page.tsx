import { Telescope } from 'lucide-react';
import { MarriagePathClient } from './MarriagePathClient';

export default function MarriagePathDashboardPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Telescope className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            Marriage Path Dashboard
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Get personalized astrological insights into your marital journey, from timelines to partner profiles.
          </p>
        </div>
        
        <MarriagePathClient />
        
      </div>
    </div>
  );
}
